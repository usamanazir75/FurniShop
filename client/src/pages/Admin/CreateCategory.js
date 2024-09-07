import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Font Awesome icons
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd'

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name,setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected,setSelected] = useState(null);
  const [updatedName,setUpdatedName] = useState("")
  //handle form
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('/api/v1/category/create-category', {name})
      if (data?.success) {
        toast.success(`${name} is created`)
        getAllCategory();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error('Error in creating category');
    }
  }
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

  //update category
  const handleUpdate = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name:updatedName})
      if(data.success){
        toast.success(`${updatedName} is updated`)
        setSelected(null)
        setUpdatedName("")
        setOpen(false)
        getAllCategory();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Error in updating category')
    }
  };
  //delete category
  const handleDelete = async(id) => {
    try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${id}`)
      if(data.success){
        toast.success(`Category is deleted`)
        getAllCategory();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Error in updating category')
    }
  }

  return (
    <Layout>
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-3 p-4">
            <AdminMenu />
          </div>
          <div className="col-md-9 p-4">
            <h1 className="manage-categories-heading mb-4 text-center">Manage Categories</h1>
            <div className='p-3 w-50'>
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-2" 
                        onClick={() => {setOpen(true) ; setUpdatedName(c.name) ; setSelected(c)}}>
                          <FaEdit /> Edit
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => {handleDelete(c._id)}}>
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setOpen(false)}
             footer={null} 
             open ={open}
             >
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
             </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
