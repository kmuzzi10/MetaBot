import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import AdminMenu from '../components/AdminMenu/AdminMenu';
import React, { useEffect } from 'react';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout actions here, e.g., clear token from local storage
        localStorage.removeItem("token");
        alert("Logout Successfully")
        // Redirect to login page
        navigate('/admin-login-metabot')
    };

    useEffect(() => {
        const isRefreshed = localStorage.getItem('isRefreshed');
        if (!isRefreshed) {
            // Perform any actions that need to happen once when the component mounts (e.g., refresh)
            window.location.reload();
            localStorage.setItem('isRefreshed', 'true');
        }
    }, []);

    return (
        <Layout>
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-lg-3 col-md-4 col-sm-4'>
                        <AdminMenu />
                    </div>
                    <div className='col-lg-9 col-md-8 col-sm-8'>
                        <h1 style={{ fontSize: '4rem' }}>Welcome Admin</h1>
                        <button className="btn btn-danger btn-lg" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home;
