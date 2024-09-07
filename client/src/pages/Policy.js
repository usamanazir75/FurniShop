import React from "react";
import Layout from "./../components/Layout/Layout";
import POLICYIMAGE from "../assests/privacypolicy.gif";

const Policy = () => {
  return (
    <Layout>
      <div className="row policy-container">
        <div className="col-md-6 mb-4">
          <img src={POLICYIMAGE} alt="Privacy Policy" style={{ width: "100%", borderRadius: '10px' }} />
        </div>
        <div className="col-md-4 mb-4">
          <h1 className="policy-title">Privacy Policy</h1>
          <p className="text-justify">
            **1. Information Collection:** We collect personal information that you provide directly to us when you create an account, make a purchase, or subscribe to our newsletters. This may include your name, email address, phone number, and payment information.
          </p>
          <p className="text-justify">
            **2. Use of Information:** The information we collect is used to process your orders, manage your account, improve our services, and communicate with you. We may also use your information for marketing and promotional purposes.
          </p>
          <p className="text-justify">
            **3. Information Sharing:** We do not share your personal information with third parties except as necessary to process your order, comply with legal obligations, or protect our rights.
          </p>
          <p className="text-justify">
            **4. Security:** We take reasonable precautions to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
          </p>
          <p className="text-justify">
            **5. Cookies:** Our website uses cookies to enhance your browsing experience. You can choose to accept or decline cookies, but this may prevent you from taking full advantage of the website.
          </p>
          <p className="text-justify">
            **6. Your Rights:** You have the right to access, correct, or delete your personal information. You can also opt out of receiving marketing communications from us at any time.
          </p>
          <p className="text-justify">
            **7. Changes to This Policy:** We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
