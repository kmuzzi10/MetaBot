import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import JobCard from '../components/jobCard';
import moment from 'moment';

const JobListing = () => {
    const params = useParams();
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const getCard = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/job-cards/get-cards/${params.id}`);
                setCards(data.cardsData);
            } catch (error) {
                console.error("Error fetching cards data:", error);
            }
        };

        getCard();

        // Scroll to top on component mount
        window.scrollTo(0, 0);
        
    }, [params.id]);

    return (
        <Layout>
            <div className='container mt-5'>
                <div style={{ width: '50%', margin: 'auto' }}>
                    {cards && (
                        <div key={cards._id} className='col-lg-12 col-md-10 col-sm-8 mt-4'>
                            <JobCard id={cards._id} title={cards.title} text={cards.text} date={moment(cards.date).format('MMMM Do, YYYY')} />
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default JobListing;
