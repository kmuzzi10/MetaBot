import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios';
import AllNewsCard from '../components/AllNewsCard';
axios.defaults.withCredentials = true;



const AllNews = () => {
  const [newsCards, setNewsCards] = useState([])

  const gettingNewsCards = async () => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/news-cards/get-cards`);
        if (data?.success) {
            // Sirf 6 cards ko slice karo
            const limitedCards = data?.cardsData;
            setNewsCards(limitedCards);
        }
    } catch (error) {
        console.log(error);
        // Handle error gracefully
    }
};

  useEffect(() => {
    gettingNewsCards();
  }, []);
  return (
    <Layout>
      <div className="d-flex justify-content-center">
        <div className='container'>


          <h1 style={{ fontSize: '4rem', paddingLeft: '100px', paddingBottom: '100px' }}>All News</h1>
          <div className='row'>
            {newsCards.map((a, index) => (
              <div key={index} className="col-lg-6 col-md-4 col-sm-12 mb-3">
                <AllNewsCard image={a.image} title={a.title} text={a.text} style={{ margin: '0 5px', padding: '10px' }} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default AllNews