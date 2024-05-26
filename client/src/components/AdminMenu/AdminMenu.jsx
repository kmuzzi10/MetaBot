import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className='text-center '>
            <h1 style={{fontSize:'2rem'}}>Admin Panel</h1>
                <div className="list-group">
                    <NavLink to='/dashboard-admin' className="list-group-item list-group-item-action text-white">Home Admin</NavLink>
                    <NavLink to='/dashboard-admin/get-trainings' className="list-group-item list-group-item-action text-white">Trainings Data</NavLink>
                    <NavLink to='/dashboard-admin/create-card' className="list-group-item list-group-item-action text-white">Create Service Cards</NavLink>
                    <NavLink to='/dashboard-admin/create-client-card' className="list-group-item list-group-item-action text-white">Create Client Card</NavLink>
                    <NavLink to='/dashboard-admin/create-news-card' className="list-group-item list-group-item-action text-white">Create News Card</NavLink>
                    <NavLink to='/dashboard-admin/create-home-card' className="list-group-item list-group-item-action text-white">Create Home Page Cards</NavLink>
                    <NavLink to='/dashboard-admin/create-project-card' className="list-group-item list-group-item-action text-white">Create Project Cards</NavLink>
                    <NavLink to='/dashboard-admin/create-training-card' className="list-group-item list-group-item-action text-white">Create Training Cards</NavLink>
                    <NavLink to='/dashboard-admin/create-job-card' className="list-group-item list-group-item-action text-white">Create Job Cards</NavLink>
                    <NavLink to='/dashboard-admin/get-card' className="list-group-item list-group-item-action text-white">Get Service Cards</NavLink>
                    <NavLink to='/dashboard-admin/get-client-card' className="list-group-item list-group-item-action text-white">Get Client Cards</NavLink>
                    <NavLink to='/dashboard-admin/get-home-card' className="list-group-item list-group-item-action text-white">Get Home Cards</NavLink>
                    <NavLink to='/dashboard-admin/get-news-card' className="list-group-item list-group-item-action text-white">Get News Cards</NavLink>
                    <NavLink to='/dashboard-admin/get-project-card' className="list-group-item list-group-item-action text-white">Get Project Cards</NavLink>
                    <NavLink to='/dashboard-admin/get-training-card' className="list-group-item list-group-item-action text-white">Get Training Cards</NavLink>
                    <NavLink to='/dashboard-admin/get-job-card' className="list-group-item list-group-item-action text-white">Get Jobs Cards</NavLink>


                </div>
            </div>

        </>
    )
}

export default AdminMenu