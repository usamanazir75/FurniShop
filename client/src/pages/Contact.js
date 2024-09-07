import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import CONTACTUSIMAGE from "../assests/contact us.gif"; 

const Contact = () => {
  return (
    <Layout>
      <div className="contactus">
        <div className="contact-image">
          <img src={CONTACTUSIMAGE} alt="contact us" />
        </div>
        <div className="contact-info">
          <h1 className="contact-title">CONTACT US</h1>
          <p className="contact-description">
            For any queries and information about products, feel free to call anytime. We are available 24X7.
          </p>
          <p className="contact-detail">
            <BiMailSend />: <a href="mailto:help@furnishop.com">help@furnishop.com</a>
          </p>
          <p className="contact-detail">
            <BiPhoneCall />: 012-3456789
          </p>
          <p className="contact-detail">
            <BiSupport />: 1800-0000-0000 (Toll-Free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
