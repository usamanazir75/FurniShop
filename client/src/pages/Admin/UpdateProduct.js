import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id,setId] = useState("")

    //get single product
    const getSingleProduct = async () => {
        try{
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            if(data?.success){
                setName(data?.product?.name)
                setId(data?.product?._id)
                setDescription(data?.product?.description)
                setPrice(data?.product?.price)
                setCategory(data?.product?.category._id)
                setQuantity(data?.product?.quantity)
                setShipping(data?.product?.shipping)
            }else{
                toast.error('Error in fetching product');
            }
        }catch(error){
            console.log(error);
            toast.error('Error in fetching product');
        }
    }
    useEffect(()=>{
        getSingleProduct();
    },[])
  
    // Get all categories
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get('/api/v1/category/get-category');
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
        toast.error('Error in fetching categories');
      }
    };
  
    useEffect(() => {
      getAllCategory();
    }, []);
  
    //create product function
    const handleUpdate = async(e) => {
      e.preventDefault()
      try {
        const productData = new FormData();
        productData.append("name", name)
        productData.append("description", description)
        productData.append("price", price)
        productData.append("quantity", quantity)
        photo && productData.append("photo", photo)
        productData.append("category", category)
        productData.append("shipping", shipping)
        const {data} = axios.put(`/api/v1/product/update-product/${id}`, productData)
        if (data?.success) {
            toast.error(data?.message)
        }else{
          toast.success('Product updated successfully');
          navigate("/dashboard/admin/products")
        }
      } catch (error) {
        console.log(error)
        toast.error('Error in updating product');
      }
    }

    //delete product
    const handleDelete = async() => {
        try {
            let answer = window.prompt('Are you sure you want to delete product ?')
            if(!answer) return;
            const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`)
            toast.success('Product deleted succcessfully')
            navigate("/dashboard/admin/products")
        } catch (error) {
            console.log(error)
            toast.error('Error in deleting product');
        }
    };
  return (
    <Layout>
    <div className="row">
      <div className="col-md-3 p-4">
        <AdminMenu />
      </div>
      <div className="col-md-9 p-4">
        <h1 className="create-product-heading">Update Product</h1>
        <div className="m-1 w-75">
          <Select
            placeholder="Select Category"
            size="large"
            showSearch
            className="from-select mb-3 col-md-12"
            onChange={(value) => setCategory(value)}
            value={category}
          >
            {categories?.map(c => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
          <div className="mb-3">
            <label className="upload-photo-btn col-md-12">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          {photo ? (
            <div className='mb-3 text-center'>
              <img src={URL.createObjectURL(photo)} alt='product_photo' height={'200px'} className='img img-responsive' />
            </div>
          ) : (
            <div className='mb-3 text-center'>
            <img src={`/api/v1/product/product-photo/${id}`} alt='product_photo' height={'200px'} className='img img-responsive' />
          </div>
          )}
          <div className="mb-3">
            <input
              type='text'
              value={name}
              placeholder='Enter product name'
              className='form-container col-md-12'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              value={description}
              placeholder='Enter product description'
              className='form-container text-area col-md-12'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type='number'
              value={price}
              placeholder='Enter product price'
              className='form-container col-md-12'
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type='number'
              value={quantity}
              placeholder='Enter product quantity'
              className='form-container col-md-12'
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-3">
          <Select
            placeholder="Select shipping"
            size="large"
            className="from-select mb-3 col-md-12"
            onChange={(value) => setShipping(value)}
            value={shipping ? "Yes" : "No"}
          >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
          </Select>
          </div>
          <div className='mb-3'>
            <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
          </div>
          <div className='mb-3'>
            <button className='btn btn-danger' onClick={handleDelete}>Delete Product</button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default UpdateProduct