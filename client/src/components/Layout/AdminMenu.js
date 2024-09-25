import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <>
    <div className='admin-menu'>
      <h4 className='text-center mb-4' style={{ fontFamily: 'Playfair Display, serif', color: '#f9a825' }}>Admin Panel</h4>
      <div className="list-group">
        <NavLink to="/dashboard/admin/create-category" className="list-group-item">
          Create Category
        </NavLink>
        <NavLink to="/dashboard/admin/create-product" className="list-group-item">
          Create Product
        </NavLink>
        
        <NavLink to="/dashboard/admin/products" className="list-group-item">
          Products
        </NavLink>
        <NavLink to="/dashboard/admin/orders" className="list-group-item">
          Orders
        </NavLink>
      </div>
    </div>
    </>
  );
}

export default AdminMenu;
