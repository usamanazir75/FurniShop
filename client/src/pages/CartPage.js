import React,{useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react"
import axios from 'axios'
import toast from 'react-hot-toast'

const CartPage = () => {
  const [cart,setCart] = useCart()
  const [auth,setAuth] = useAuth()
  const navigate = useNavigate()
  const [clientToken, setClientToken] = useState("")
  const [instance,setInstance] = useState("")
  const [loading,setLoading] = useState(false)

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => { total += item.price; }); // Use forEach for summing up
  
      return total.toLocaleString("en-US", {
        style: "currency", 
        currency: "USD",   
      });
    } catch (error) {
      console.log(error);
    }
  };
  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart]
      let index = myCart.findIndex((item) => item._id === pid)
      myCart.splice(index, 1)
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error)
    }
  };

  //get client token
  const getToken = async () => {
    try {
      const {data} = await axios.get('/api/v1/product/braintree/token')
      setClientToken(data?.clientToken)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getToken()
  },[auth?.token])

  //handle payments
  const handlePayment = async() => {
    try {
      setLoading(true)
      const {nonce} = await instance.requestPaymentMethod()
      const {data} = await axios.post('/api/v1/product/braintree/payment',{
        nonce,cart
      })
      setLoading(false)
      localStorage.removeItem('cart')
      setCart([])
      navigate('/dashboard/user/orders')
      toast.success('Payment Completed Successfully')
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center p-2 mb-1 mt-2' style={{fontFamily: 'Playfair Display, Serif'}}>
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h6 className='text-center'>
              {cart?.length > 0 ? `You have ${cart.length} items in cart ${auth?.token ? "" : "Please login to checkout"}` : "Your cart is empty"}
            </h6>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
              {
                cart?.map( (p) => (
                  <div className='row mb-4 card flex-row'>
                    <div className='col-md-4 p-2'>
                    <img src={`/api/v1/product/product-photo/${p._id}`} 
                    className='card-img-top product-card-img full-image' 
                    alt={p.name} 
                    width="100p"
                    height={"100px"}
                    />
                    </div>
                    <div className='col-md-8 p-3'>
                      <h5 className="name-cart mt-2" style={{fontFamily: 'playfair display, serif'}}>{p.name}</h5>
                      <p className="description mt-2">{p.description}</p>
                      <p className='card-text product-card-price'>
                       <span className='price-label'>Price :</span> $ {p.price}
                      </p>
                      <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                    </div>
                  </div>
                ))
              }
          </div>
          <div className='col-md-4 text-center'>
            <h4 style={{fontFamily: 'playfair display, serif'}}>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h5 style={{fontFamily: 'font awsome'}}>Total : {totalPrice()}</h5>
            {auth?.user?.address ? (
              <>
              <div className='mb-3'>
                <h4 style={{fontFamily: "font awsome"}}>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button className='btn btn-outline-warning'
                onClick={() => navigate('/dashboard/user/profile')}
                >Update Address
                </button>
              </div>
              </>
            ) : (
              <div className='mb-3'>
                {
                  auth?.token ? (
                    <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                  ): (
                    <button className='btn btn-outline-warning' onClick={() => navigate('/login',{
                      state: "/cart"
                    })}>Please Login To Checkout</button>
                  )
                }
              </div>
            )}
            <div className='mt-2'>
              {
                !clientToken || !cart?.length ? (""):(
                  <>
                     <DropIn
                      options={{ 
                        authorization: clientToken,
                      paypal:{
                      flow: 'vault'  // Optional: Use 'vault' for storing the payment details
                      } 
                    }}
                    onInstance={(instance) => setInstance(instance)}
                    />
                  <button className='btn btn-primary mb-3' onClick={handlePayment} disabled={loading || !instance || !auth?.user?.address}>
                  {loading ? "processing ...." : "Make Payment"}
                  </button>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CartPage