import React from 'react';
import '../../App.css'; 
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white">
      <div className="container py-5">
        <div className="row justify-content-between">
          {/* Logo and Description */}
          <div className="col-md-4 mb-4">
            <h1 className="logo" style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#ffffff' }}>
              Furni<span style={{ color: '#f9a825' }}>Shop</span>
            </h1>
            <p className="mt-3" style={{ fontFamily: 'Poppins, sans-serif', color: '#ddd' }}>
              Elevate your living spaces with our exclusive range of modern and classic furniture. We ensure top-notch quality and timeless designs for your perfect home.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h5 style={{ fontFamily: 'Poppins, sans-serif', color: '#f9a825' }}>Quick Links</h5>
            <ul className="list-unstyled" style={{ fontFamily: 'Poppins, sans-serif', color: '#ddd' }}>
               <li><Link to="/about" className="text-white text-decoration-none hover-underline" onClick={() => window.scrollTo(0, 0)}>About</Link></li>
               <li><Link to="/contact" className="text-white text-decoration-none hover-underline" onClick={() => window.scrollTo(0, 0)}>Contact</Link></li>
               <li><Link to="/policy" className="text-white text-decoration-none hover-underline" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-md-4 mb-4">
            <h5 style={{ fontFamily: 'Poppins, sans-serif', color: '#f9a825' }}>Contact Us</h5>
            <p style={{ fontFamily: 'Poppins, sans-serif', color: '#ddd' }}>Phone: +123 456 789</p>
            <p style={{ fontFamily: 'Poppins, sans-serif', color: '#ddd' }}>Email: info@furnishop.com</p>
            <p style={{ fontFamily: 'Poppins, sans-serif', color: '#ddd' }}>Address: 123 Furniture St, New York, NY</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom bg-secondary py-3">
        <div className="container d-flex justify-content-between align-items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <p className="mb-0">© 2024 FurniShop. All Rights Reserved.</p>
          <div>
            <a href="#" className="text-white text-decoration-none me-3 hover-underline">Privacy Policy</a>
            <a href="#" className="text-white text-decoration-none hover-underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
