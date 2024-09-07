import React from 'react';
import Layout from "../../components/Layout/Layout";
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-3 mb-3 mb-md-0">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div 
              className="dashboard-content card p-3"
              style={{
                maxWidth: '600px', // Limit the maximum width
                margin: '0 auto', // Center the content horizontally
                borderRadius: '0.5rem', // Rounded corners
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
                backgroundColor: '#fff' // White background for the card
              }}
            >
              <h1 
                style={{ 
                  fontFamily: 'font-awsome', 
                  color: '#333', 
                  fontSize: '1.5rem' // Adjust font size
                }}
              >
               Admin Name: {auth?.user?.name}
              </h1>
              <h1 
                style={{ 
                  fontFamily: 'font-awsome', 
                  color: '#333', 
                  fontSize: '1.5rem' // Adjust font size
                }}
              >
               Admin Email: {auth?.user?.email}
              </h1>
              <h1 
                style={{ 
                  fontFamily: 'font-awsome', 
                  color: '#333', 
                  fontSize: '1.5rem' // Adjust font size
                }}
              >
               Admin Phone: {auth?.user?.phone}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
