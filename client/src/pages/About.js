import React from "react";
import Layout from "./../components/Layout/Layout";
import ABOUTUSIMAGE from "../assests/about us.gif";

const About = () => {
  return (
    <Layout>
      <div className="row aboutus">
        <div className="col-md-6 about-image">
          <img
            src={ABOUTUSIMAGE}
            alt="About Us"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>
        <div className="col-md-4 about-info d-flex align-items-center justify-content-center">
          <div>
            <h1 className="bg-dark text-center text-white p-2" style={{ fontFamily: 'Playfair Display, serif'}}>ABOUT US</h1>
            <p className="about-description text-justify mt-3">
              Welcome to <span style={{ color: "#f9a825" }}>FurniShop</span>, your ultimate destination for high-quality, stylish, and affordable furniture. At FurniShop, we believe that a beautiful home is a happy home, and we strive to provide our customers with the finest selection of furniture that combines comfort, durability, and elegance. Our diverse range of products includes everything from cozy sofas and luxurious beds to modern dining sets and functional office furniture, all designed to transform your living space into a haven of style and comfort.
            </p>
            <p className="about-description text-justify mt-3">
              With a commitment to exceptional customer service and a seamless shopping experience, FurniShop is dedicated to helping you create the home of your dreams. Our team of experts is always on hand to offer personalized advice and assistance, ensuring that you find the perfect pieces to suit your taste and budget. Explore our collection today and discover why FurniShop is the go-to destination for furniture lovers everywhere!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
