import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  // Fetch product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container m-4">
        <div className="col-md-6 product-image-container">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="product-img"
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
          <h1 className="product-heading text-center">Product Details</h1>
          <h5 className="product-label">Name</h5>
          <h6>{product.name}</h6>
          <h5 className="product-label">Quantity</h5>
          <h6>{product.quantity}</h6>
          <h5 className="product-label">Price</h5>
          <h6 className="product-price">${product.price}</h6>

          {/* Add to Cart button in product details */}
          <button
            className="btn btn-secondary btn-sm product-button add-to-cart-btn"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem('cart', JSON.stringify([...cart, product]));
              toast.success('Item Added To Cart');
            }}
          >
            Add To Cart
          </button>

          <h5 className="product-label">Category</h5>
          <h6>{product?.category?.name}</h6>
          <h5 className="product-label">Description</h5>
          <h6>{product.description}</h6>
        </div>
      </div>
      <div className="row m-4">
        <h3 className="similar-products text-center">Similar Products</h3>
        {relatedProducts.length < 1 && (<p className="text-center">No Similar Products</p>)}
        <div className="row product-grid">
          {relatedProducts?.map((p) => (
            <div key={p._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card product-card">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top product-card-img"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title product-card-title">{p.name}</h5>
                  <p className="card-text product-card-text">{p.description}</p>
                  <p className="card-text product-card-price">$ {p.price}</p>
                  <div className="button-group">
                    <button
                      className="btn btn-primary btn-sm product-button"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      Details
                    </button>
                    <button
                      className="btn btn-secondary btn-sm product-button"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem('cart', JSON.stringify([...cart, p]));
                        toast.success('Item Added To Cart');
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
