import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import Layout from '../../Layout/Layout';
import axios from "axios";
import { Link } from "react-router-dom";
axios.defaults.withCredentials = true;
const GetProjectCard = () => {
    const [card, setCard] = useState([]);

    // Function to fetch all card
    const getAllCards = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/project-cards/get-cards`);
            if (data?.success) {
                // Sirf 6 cards ko slice karo
                const limitedCards = data?.cardsData;
                setCard(limitedCards);
            }
        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    };

    // Lifecycle hook to fetch all card on component mount
    useEffect(() => {
        getAllCards();
    }, []);

   
    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-4'>
                        <AdminMenu />
                    </div>
                    <div className='col-lg-9 col-md-9 col-sm-8'>
                        <h1 style={{fontSize:'3rem'}} className='text-center'>All Projects Cards List</h1>
                        <div className='row'>
                            {card.map(p => (
                                <div key={p._id} className='col-xl-4 col-lg-4 col-md-6 col-sm-12'>
                                    <Link to={`/dashboard-admin/update-project-card/${p._id}`} className='card-link'>
                                        <div className="card m-3" style={{ width: '100%' }}>
                                            <img src={`${process.env.REACT_APP_API}/api/v1/project-cards/card-photo/${p._id}`} className="card-img-top" alt={p.title} />
                                            <div className="card-body" style={{ maxHeight: '200px', overflow: 'auto' }}>
                                                <h5 className="card-title">{p.title}</h5>
                                                <p className="card-text">{p.text}</p>
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

export default GetProjectCard;
