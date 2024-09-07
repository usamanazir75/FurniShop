import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const Users = () => {
  return (
    <Layout>
        <div className="row">
            <div className="col-md-3 p-4">
                <AdminMenu/>
            </div>
            <div className="col-md-9 p-4">
            <h1>All Users</h1>
            </div>
        </div>
    </Layout>
  )
}

export default Users