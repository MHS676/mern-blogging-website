import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content gap-6 min-h-full w-80 p-4 ">
      {/* Sidebar content here */}
      <li className='mt-5'><Link to="/admin">Dashboard Overview</Link></li>
          <li><Link to="/admin/posts">Posts Management</Link></li>
          <li><Link to="/admin/comments">Comments Management</Link></li>
          <li><Link to="/admin/users">Users Management</Link></li>
          <li><Link to="/admin/categories">Categories/Tags Management</Link></li>
          <li><Link to="/admin/settings">Site Settings</Link></li>
          <li><Link to="/admin/logout">Logout</Link></li>
    </ul>
  </div>
</div>
  )
}

export default Dashboard
