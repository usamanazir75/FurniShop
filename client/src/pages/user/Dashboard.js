import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid px-3 py-4" style={{ marginTop: '10px' }}> {/* Added marginTop to prevent overlap with header */}
        <div className="row">
          <div className="col-md-3 mb-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div
              className="dashboard-content card p-4"
              style={{
                margin: '0 auto', // Center the content horizontally
                borderRadius: '8px', // Rounded corners
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Subtle shadow
                backgroundColor: '#fff', // White background for the card
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#333', marginBottom: '1rem' }}>
                {auth?.user?.name}
              </h3>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#333', marginBottom: '1rem' }}>
                {auth?.user?.email}
              </h3>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#333' }}>
                {auth?.user?.address}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
