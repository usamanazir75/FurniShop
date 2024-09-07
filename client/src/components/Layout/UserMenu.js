import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <div className='admin-menu'>
    <h4 className='text-center mb-4' style={{ fontFamily: 'Playfair Display, serif', color: '#f9a825' }}>Dashboard</h4>
    <div className="list-group">
      <NavLink to="/dashboard/user/profile" className="list-group-item">
        Profile
      </NavLink>
      <NavLink to="/dashboard/user/orders" className="list-group-item">
        All Orders
      </NavLink>
    </div>
  </div>
  )
}

export default UserMenu