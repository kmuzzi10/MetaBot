import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios';
import AllServiceCard from '../components/AllServiceCard';
axios.defaults.withCredentials = true;
const AllServices = () => {

  const [cards, setCards] = useState([])

  const gettingCards = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/cards/get-cards`);
      if (data?.success) {
        setCards(data?.cardsData);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    gettingCards();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="d-flex justify-content-center">
        <div className='container'>


          <h1 style={{ fontSize: '4rem',paddingLeft:'100px',paddingBottom:'100px' }}>All Services</h1>
          <div className='row'>
            {cards.map((a, index) => (
              <div key={index} className="col-lg-6 col-md-4 col-sm-12 mb-3">
                <AllServiceCard image={`${process.env.REACT_APP_API}/api/v1/cards/card-photo/${a._id}`} title={a.title} text={a.text} style={{ margin: '0 5px', padding: '10px' }} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </Layout>

  )
}

export default AllServices