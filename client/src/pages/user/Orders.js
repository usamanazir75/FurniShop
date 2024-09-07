import React,{useState,useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth,setAuth] = useAuth();

  const getOrders = async() => {
    try {
      const {data} = await axios.get("/api/v1/auth/orders")
      setOrders(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(auth?.token) getOrders();
  },[auth?.token])
  return (
    <Layout>
      <div className="container-fluid px-3 py-4" style={{ marginTop: '10px' }}> {/* Added marginTop to prevent overlap with header */}
        <div className="row">
          <div className="col-md-3 mb-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div
              className="orders-content card p-4"
              style={{
                margin: '0 auto', // Center the content horizontally
                borderRadius: '8px', // Rounded corners
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Subtle shadow
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <h1
                style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#333',
                  textAlign: 'center'
                }}
              >
                All Orders
              </h1>
              {
                orders?.map((o, i) => {
                  return (
                    <div className='border shadow mb-4' style={{ borderRadius: '8px', overflow: 'hidden' }}>
                      <table className='table'>
                        <thead>
                          <tr>
                            <td scope='col'>#</td>
                            <td scope='col'>Status</td>
                            <td scope='col'>Buyer</td>
                            <td scope='col'>Date</td>
                            <td scope='col'>Payment</td>
                            <td scope='col'>Quantity</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>{i + 1}</th>
                            <th>{o?.status}</th>
                            <th>{o?.buyer?.name}</th>
                            <th>{moment(o?.createdAt).fromNow()}</th>
                            <th>{o?.payment.success ? "Success" : "Failed"}</th>
                            <th>{o?.products?.length}</th>
                          </tr>
                        </tbody>
                      </table>
                      <div className='container'>
                        {  
                          o?.products?.map( (p,i) => (
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
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
