import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;


const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

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
  const handleCreate = async(e) => {
    e.preventDefault()
    try {
      const productData = new FormData();
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("quantity", quantity)
      productData.append("photo", photo)
      productData.append("category", category)
      productData.append("shipping", shipping)
      const {data} = axios.post('/api/v1/product/create-product', productData)
      if (data?.success) {
        toast.error('Error in creating product');
      }else{
        toast.success('Product created successfully');
        navigate('/dashboard/admin/products')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error in creating product');
    }
  }

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3 p-4">
          <AdminMenu />
        </div>
        <div className="col-md-9 p-4">
          <h1 className="create-product-heading">Create Product</h1>
          <div className="m-1 w-75">
            <Select
              placeholder="Select Category"
              size="large"
              showSearch
              className="from-select mb-3 col-md-12"
              onChange={(value) => setCategory(value)}
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
            {photo && (
              <div className='mb-3 text-center'>
                <img src={URL.createObjectURL(photo)} alt='product_photo' height={'200px'} className='img img-responsive' />
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
            >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
            </Select>
            </div>
            <div className='mb-3'>
              <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
