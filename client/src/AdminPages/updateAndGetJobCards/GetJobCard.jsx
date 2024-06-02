import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import Layout from '../../Layout/Layout';
import axios from "axios";
import { Link } from "react-router-dom";
import moment from 'moment';

axios.defaults.withCredentials = true;

const GetJobCard = () => {
    const [cards, setCards] = useState([]);

    // Function to fetch all cards
    const fetchAllCards = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/job-cards/get-cards`);
            if (data?.success) {
                setCards(data.cardsData);
            }
        } catch (error) {
            console.log('Error fetching cards:', error);
            alert('Something went wrong');
        }
    };

    // Lifecycle hook to fetch all cards on component mount
    useEffect(() => {
        fetchAllCards();
    }, []);

    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-4'>
                        <AdminMenu />
                    </div>
                    <div className='col-lg-9 col-md-9 col-sm-8'>
                        <h1 style={{ fontSize: '3rem' }} className='text-center'>All Job Cards List</h1>
                        <div className='row'>
                            {cards.map(p => (
                                <div key={p._id} className='col-xl-4 col-lg-4 col-md-6 col-sm-12'>
                                    <Link to={`/dashboard-admin/update-job-card/${p._id}`} className='card-link'>
                                        <div className="card m-3" style={{ width: '100%', backgroundColor: 'white', color: 'black' }}>
                                            <div className="card-body" style={{ maxHeight: '200px', overflow: 'auto' }}>
                                                <h5 className="card-title">Job Title <br />{p.title}</h5>
                                                <p className="card-text">Description <br />{p.text}</p>
                                                <p className="card-text">Date <br />{moment(p.date).format('MMMM Do, YYYY')}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default GetJobCard;
