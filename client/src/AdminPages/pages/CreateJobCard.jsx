import React, { useState } from 'react';
import Layout from '../../Layout/Layout';
import axios from 'axios';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

axios.defaults.withCredentials = true;
const CreateJobCard = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState(null);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append('title', title);
            productData.append('text', text);
            if (date) {
                productData.append('date', date.toISOString());
            }

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/job-cards/create-card`, productData);
            if (data?.success) {
                alert('Card Created Successfully');
            } else {
                alert('Card Created Successfully');
            }
        } catch (error) {
            console.log(error);
            alert('Something Went Wrong');
        }
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    return (
        <Layout title={'Create Card'}>
            <div className='fluid-container m-3 p-3'>
                <div className='row'>
                    <div className='col-lg-3 col-md-4 col-sm-4'>
                        <AdminMenu />
                    </div>
                    <div className='col-lg-9 col-md-8 col-sm-8'>
                        <h1 style={{ fontSize: '4rem' }}>Create Job Cards</h1>
                        <div className='m-1 w-75'>
                            <div className='mb-3'>
                                <input
                                    type='text'
                                    placeholder='Enter Title of Card'
                                    className='form-control'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className='mb-3' style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                <textarea
                                    placeholder='Enter Job Description'
                                    className='form-control'
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    style={{ resize: 'vertical', minHeight: '300px', maxHeight: '300px', width: '100%', border: 'none', outline: 'none', fontSize: '18px', fontFamily: 'Arial, sans-serif', padding: '10px', lineHeight: '1.5', boxSizing: 'border-box' }}
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
                                <button className='btn btn-primary' onClick={handleCreate}>
                                    Add Job Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateJobCard;
