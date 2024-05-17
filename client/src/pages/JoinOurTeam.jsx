import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import "../css/joinTeam.css";
import JobCard from '../components/jobCard';
import axios from 'axios';
import { motion } from 'framer-motion';

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API}/api/v1/job-cards`,
});

const JoinOurTeam = () => {
    const [cards, setCards] = useState([]);
    const [isTextVisible, setIsTextVisible] = useState(false);

    const gettingCards = useCallback(async () => {
        try {
            const { data } = await axiosInstance.get('/get-cards');
            if (data?.success) {
                const limitedCards = data.cardsData
                setCards(limitedCards);
                setIsTextVisible(true); // Show text after cards are loaded
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    }, []);

    useEffect(() => {
        gettingCards();
        window.scrollTo(0, 0);
    }, [gettingCards]);

    return (
        <Layout>
            <div className='fluid-container'>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className='row team-row'
                >
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        {isTextVisible && "Are You Ready To Join Our Team ?"}
                    </motion.h1>
                    <motion.h3
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        {isTextVisible && "See Our Latest Job Openings"}
                    </motion.h3>
                </motion.div>
            </div>
            <div className='container'>
                <div className='row'>
                    {cards.map((card) => (
                        <div key={card._id} className='col-lg-6 col-md-6 col-sm-12'>
                            <JobCard image={`${process.env.REACT_APP_API}/api/v1/job-cards/card-photo/${card._id}`} title={card.title} text={card.text} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default JoinOurTeam;
