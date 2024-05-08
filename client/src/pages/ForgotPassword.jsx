import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../Layout/Layout';
axios.defaults.withCredentials = true;
const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [answer, setAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
                email,
                answer,
                newPassword
            });
            setMessage(response.data.message);
            toast.success('Password has changed'); // Show success toast notification
            navigate('/admin-login-metabot');
        } catch (error) {
            setMessage(error.response.data.message);
            toast.error('Error: ' + error.response.data.message); // Show error toast notification
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h1 style={{ fontSize: '4rem' }} className="text-center text-success mb-4">Forgot Password</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Email:</label>
                                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Answer to Security Question:</label>
                                        <input type="text" className="form-control" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">New Password:</label>
                                        <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                    </div>
                                    <button type="submit" className="btn btn-success w-100">Submit</button>
                                </form>
                                {message && <p className="mt-3 text-center">{message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Toast container for displaying notifications */}
        </Layout>
    );
};

export default ForgotPassword;
