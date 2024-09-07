import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { FaFilter } from 'react-icons/fa'; // Import an icon for filters
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/cart";
import toast from 'react-hot-toast'

const HomePage = () => {
  const navigate = useNavigate()
  const [cart,setCart] = useCart()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // State to toggle filters on mobile
  const [total,setTotal] = useState(0)
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Get products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data.products);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  // Get total count
  const getTotal = async() => {
    try {
     const {data} = await axios.get('/api/v1/product/product-count')
     setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
   }

  useEffect(() => {
    if(page === 1) return
    loadMore()
  },[page])

  // Load more products
  const loadMore = async() => {
    try {
      setLoading(true)
      const {data} = await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post('/api/v1/product/product-filters', { checked, radio });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle menu toggle
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Layout>
      {/* Filter Icon Button for Mobile */}
      <div className={`filter-icon-container d-block d-md-none mt-4 ${isMenuOpen ? 'd-none' : 'd-block'}`}>
        <button className="btn btn-light filter-toggle-btn mt-5" onClick={() => setShowFilters(!showFilters)}>
          <FaFilter /> {/* Filter Icon */}
        </button>
      </div>

      <div className='row'>
        {/* Sidebar for Filters (Visible on Desktop or when toggled on Mobile) */}
        <div className={`col-md-2 filters-section ${showFilters ? 'd-block' : 'd-none d-md-block'}`}>
          <h4 className='text-center mt-4' style={{ fontFamily: 'Playfair Display, serif' }}>Filter Category</h4>
          <div className='d-flex flex-column p-4'>
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className='text-center mt-4' style={{ fontFamily: 'Playfair Display, serif' }}>Filter By Price</h4>
          <div className='d-flex flex-column p-4'>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className='d-flex flex-column p-4'>
           <button className='btn btn-danger' onClick={() => window.location.reload()}>Reset Filters</button>
          </div>
        </div>

        {/* Products Grid */}
        <div className='col-md-9 mt-4'>
          <h1 className='text-center mb-4' style={{ fontFamily: 'Playfair Display, serif' }}>
            All Products
          </h1>
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
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button className='btn btn-warning' onClick={(e) =>{
                e.preventDefault();
                setPage(page + 1);
              }}>
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
