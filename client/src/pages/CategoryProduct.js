import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from "../context/cart";


const CategoryProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [category, setcategory] = useState([])
    const [cart,setCart] = useCart()

    useEffect(() => {
        if(params?.slug) getProductByCat()
    },[params?.slug])
    const getProductByCat = async() => {
        try {
            const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setcategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
        <div className='container mt-3'>
            <h3 className='text-center' style={{fontFamily: 'Playfair Display, Serif'}}>Category -{category?.name}</h3>
            <h6 className='text-center'>{products?.length} result found</h6>
            <div className='row'>
            <div className='row product-grid'>
            {products?.map((p) => (
              <div key={p._id} className='col-lg-3 col-md-4 col-sm-6 mb-4'>
                <div className='card product-card'>
                  <img src={`/api/v1/product/product-photo/${p._id}`} className='card-img-top product-card-img' alt={p.name} />
                  <div className='card-body'>
                    <h5 className='card-title product-card-title'>{p.name}</h5>
                    <p className='card-text product-card-text'>{p.description}</p>
                    <p className='card-text product-card-price'>$ {p.price}</p>
                    <div className='button-group'>
                      <button className='btn btn-primary btn-sm product-button' onClick={() => navigate(`/product/${p.slug}`)}>Details</button>
                      <button className='btn btn-secondary btn-sm product-button' onClick={() => {
                        setCart([...cart,p]);
                        localStorage.setItem('cart', JSON.stringify([...cart, p]))
                        toast.success('Item Added To Cart')
                        }}>
                          Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
         </div>
         </div>
    </Layout>
  )
}

export default CategoryProduct