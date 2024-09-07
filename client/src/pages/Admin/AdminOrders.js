import React, {useState,useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth';
import moment from 'moment'
import {Select} from 'antd'

const {Option} = Select;
const AdminOrders = () => {
    const [status,setStatus] = useState(['Pending', 'Shipped', 'Delivered', 'Cancelled'])
    const [changeStatus,setChangeStatus] = useState("")

    const [orders, setOrders] = useState([]);
    const [auth,setAuth] = useAuth();
  
    const getOrders = async() => {
      try {
        const {data} = await axios.get("/api/v1/auth/all-orders")
        setOrders(data);
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
      if(auth?.token) getOrders();
    },[auth?.token])

    const handleChange = async(orderId,value) => {
      try {
        const {data} = await axios.put(`/api/v1/auth/order-status/${orderId}`, {status:value})
        getOrders();
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <Layout>
      <div className='row mt-3 p-3'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
            <h1 className='text-center' style={{fontFamily: 'Playfair Display, Serif'}}>All Orders</h1>
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
                            <th>
                            <Select
                                onChange={(value) => handleChange(o._id,value)}
                                defaultValue={o?.status}
                                className='custom-select'
                            >
                                {status.map((s, i) => (
                                    <Option key={i} value={s}>{s}</Option>
                                ))}
                            </Select>

                            </th>
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
    </Layout>
  )
}

export default AdminOrders