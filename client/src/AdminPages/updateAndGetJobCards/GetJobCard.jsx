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
                handleExpiredCards(data.cardsData);
            }
        } catch (error) {
            console.log('Error fetching cards:', error);
            alert('Something went wrong');
        }
    };



    // Function to handle expired cards
    const handleExpiredCards = async (cards) => {
        const currentDate = new Date(); // Get current date

        for (const card of cards) {
            const cardDate = new Date(card.date); // Get card date
            const isExpired = currentDate > cardDate;

            // Exclude the case where the current date and the card's date are the same
            const isSameDate = currentDate.toDateString() === cardDate.toDateString();
            if (isExpired && !isSameDate) {
                // Logging for debugging purposes
                console.log(`Card ID: ${card._id}`);
                console.log(`Card Date: ${cardDate.toISOString().slice(0, 10)}`);
                console.log(`Current Date: ${currentDate.toISOString().slice(0, 10)}`);
                console.log(`Is Expired: ${isExpired}`);

                await deleteCard(card._id);
            }
        }

        // Refetch cards after deletion to update the list
        fetchAllCards();
    };




    // Function to delete a card by ID
    const deleteCard = async (cardId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API}/api/v1/job-cards/delete-cards/${cardId}`);
            console.log(`Deleted card with ID: ${cardId}`);
        } catch (error) {
            console.log(`Failed to delete card with ID: ${cardId}`, error);
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
