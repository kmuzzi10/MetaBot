import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios';
import ProjectCards from '../components/ProjectCards';

axios.defaults.withCredentials = true;


const AllProjects = () => {
  const [projectCards, setprojectCards] = useState([])

  const gettingNewsCards = async () => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/project-cards/get-cards`);
        if (data?.success) {
            // Sirf 6 cards ko slice karo
            const limitedCards = data?.cardsData;
            setprojectCards(limitedCards);
        }
    } catch (error) {
        console.log(error);
        // Handle error gracefully
    }
};

  useEffect(() => {
    gettingNewsCards();
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <div className="d-flex justify-content-center">
        <div className='container'>


          <h1 style={{ fontSize: '4rem', paddingLeft: '100px', paddingBottom: '100px' }}>All Projects</h1>
          <div className='row'>
            {projectCards.map((a, index) => (
              <div key={index} className="col-lg-6 col-md-4 col-sm-12 mb-3">
                <ProjectCards image={`${process.env.REACT_APP_API}/api/v1/project-cards/card-photo/${a._id}`} title={a.title} text={a.text} style={{ margin: '0 5px', padding: '10px' }} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default AllProjects