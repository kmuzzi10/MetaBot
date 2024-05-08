import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../Layout/Layout";
axios.defaults.withCredentials = true;
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      console.log('Login successful', user);
      toast.success('Login successful'); // Show success toast notification
      setTimeout(() => {
        navigate('/dashboard-admin');
        setIsLoading(false); // Set loading to false after navigation
      }, 10000);
    } catch (error) {
      setIsLoading(false); // Set loading to false on error
      toast.error(error.response.data.message); // Show error toast notification
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-dark">
              <div className="card-body">
                <h1 style={{fontSize:'4rem'}} className="text-center text-success mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="visually-hidden">Loading...</span>
                      </>
                    ) : (
                      'Login'
                    )}
                  </button>
                  <Link to='/admin-login-metabot-forgot-password' className="d-block text-center mt-3">Forgot password?</Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Toast container for displaying notifications */}
    </Layout>
  );
};

export default LoginForm;
