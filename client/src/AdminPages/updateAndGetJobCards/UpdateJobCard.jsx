import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';
import axios from 'axios';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';

axios.defaults.withCredentials = true;

const UpdateJobCard = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("");

    useEffect(() => {
        const getSingleCard = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/job-cards/get-cards/${params.id}`);
                const { title, text, date, _id } = data.cardsData;
                setTitle(title);
                setText(text);
                setId(_id)
                setDate(new Date(date));

                // Check if current date is after expiration date, if yes, delete the card
                // const currentDate = new Date();
                // console.log("Date")
                // console.log(currentDate)
                // console.log("dodo")
                // console.log(new Date(date))
                // if (currentDate > new Date(date)) {
                //     handleDelete();
                // }
            } catch (err) {
                console.error('Error fetching card:', err);
            }
        };
        getSingleCard();
    }, [params.id]);

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('text', text);
            if (date) {
                formData.append('date', date.toISOString());
            }
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/job-cards/update-cards/${params.id}`, formData);
            if (data.success) {
                alert('Card Updated Successfully');
                navigate('/dashboard-admin/get-job-card'); // Redirect after successful update
            } else {
                alert('Failed to update card');
            }
        } catch (error) {
            console.error('Error updating card:', error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = date => {
        setDate(date);
    };

    const handleDelete = async () => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this product?');
            if (confirmed) {
                const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/job-cards/delete-cards/${id}`);
                if (data.success) {
                    alert("Product deleted successfully");
                    navigate('/dashboard-admin/get-job-card'); // Redirect after successful deletion
                } else {
                    alert("Failed to delete product");
                }
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Something went wrong");
        }
    }


    return (
        <Layout title={'Update product'}>
            <div className='fluid-container m-3 p-3'>
                <div className='row'>
                    <div className='col-lg-3 col-md-4 col-sm-4'>
                        <AdminMenu />
                    </div>
                    <div className='col-lg-9 col-md-8 col-sm-8'>
                        <h1>Update Cards</h1>
                        <div className='m-1 w-75'>
                            <div className='mb-3'>
                                <input
                                    type='text'
                                    placeholder='Enter Name of Product'
                                    className='form-control'
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <textarea
                                    type='text'
                                    placeholder='Enter Text of Product'
                                    className='form-control'
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    style={{ resize: 'none', minHeight: '100px', maxHeight: '200px' }}
                                />
                            </div>
                            <div className='mb-3'>
                                <DatePicker
                                    className='form-control'
                                    selected={date}
                                    onChange={handleDateChange}
                                    dateFormat='yyyy-MM-dd'
                                    placeholderText='Select a date'
                                />
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-primary' onClick={handleUpdate} disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Product'}
                                </button>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-danger' onClick={handleDelete}>
                                    Delete Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateJobCard;
