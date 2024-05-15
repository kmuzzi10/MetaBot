import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../Layout/Layout';
import ServiceImage1 from "../assets/HomePagePics/servicesImages/matrix-hacker-background.jpg";
import CenterModeSliderService from "../components/ServiceSlider";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import ProjectCards from '../components/ProjectCards';
import { Link } from 'react-router-dom';
import MediaCard from '../components/MediaCard';
axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API}/api/v1`,
  // Add headers or other configurations here if needed
});

const ServicePage = () => {
  const [cards, setCards] = useState([]);
  const [projectCards, setProjectCards] = useState([]);
  const [trainingCards, setTrainingCards] = useState([]);

  const gettingCards = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get('/cards/get-cards');
      if (data?.success) {
        setCards(data?.cardsData);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }, []);

  useEffect(() => {
    gettingCards();
  }, [gettingCards]);

  const gettingProjectCards = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get('/project-cards/get-cards');
      if (data?.success) {
        setProjectCards(data?.cardsData);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }, []);

  useEffect(() => {
    gettingProjectCards();
  }, [gettingProjectCards]);


  const gettingTrainingCards = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get('/training-cards/get-cards');
      if (data?.success) {
        setTrainingCards(data?.cardsData);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }, []);

  useEffect(() => {
    gettingTrainingCards();
    window.scrollTo(0, 0);
  }, [gettingTrainingCards]);

  return (
    <Layout>
      <div className="fluid-container">
        {/* Section 1 */}
        <div className="row">
          <div style={{ paddingLeft: '40px' }} className="col-lg-6 col-md-6 col-sm-12 mt-5 ">
            <h1 style={{ fontSize: '3.4rem' }}>Our Services</h1>
            <hr style={{ width: '180px', borderTop: '5px dotted white' }} />
            <p style={{ fontSize: '1.1rem' }}>
              At Metabot, we offer a comprehensive range of cutting-edge technology solutions tailored to meet the diverse needs of our clients. From custom software development to AI-powered automation, we pride ourselves on delivering exceptional services that drive innovation and efficiency. Our team of experts collaborates closely with clients to understand their unique requirements and challenges, ensuring that our solutions are precisely aligned with their business objectives. Whether you're a startup looking to establish your digital presence or a large enterprise seeking to streamline operations, Metabot has the expertise and resources to deliver results. With a focus on quality, reliability, and seamless integration, we strive to exceed our clients' expectations and empower them to achieve their goals in today's dynamic business landscape. Partner with Metabot and experience the difference that innovative technology solutions can make for your organization.
            </p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <img className='service-page-pic' width={'95%'} height={'100%'} src={ServiceImage1} alt='serviceImage' />
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div style={{ paddingTop: '50px' }} className="fluid-container">
        <div className='mt-5'>
          <CenterModeSliderService />
        </div>
      </div>

      {/* Section 3 */}
      <div className='container service-cards-container'>
        <h1 style={{ fontSize: '4rem', marginLeft: '30px' }}>All Services From Us</h1>
        <hr style={{ width: '180px', borderTop: '8px dotted', marginLeft: '30px', paddingBottom: '3rem' }} />
        <div className='row'>
          {cards.map((card, index) => (
            <div key={index} className="col-lg-4 col-md-4 col-sm-12 mb-3">
              <ServiceCard image={`${process.env.REACT_APP_API}/api/v1/cards/card-photo/${card._id}`} title={card.title} text={card.text} style={{ margin: '0 5px', padding: '10px' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Section 5 */}
      <div className='container service-cards-container'>
        <h1 style={{ fontSize: '4rem', marginLeft: '30px' }}>Our Projects</h1>
        <hr style={{ width: '180px', borderTop: '8px dotted', marginLeft: '30px', paddingBottom: '3rem' }} />
        <div className='row'>
          {projectCards.map((projectCard, index) => (
            <div key={index} className="col-lg-6 col-md-4 col-sm-12 mb-3">
              <MediaCard image={`${process.env.REACT_APP_API}/api/v1/project-cards/card-photo/${projectCard._id}`} title={projectCard.title} description={projectCard.text} style={{ margin: '0 5px', padding: '10px' }} />
            </div>
          ))}
        </div>
        <Link to='/all-projects'>
          <button type="button" className="btn btn-lg custom-btn about-button">Show All Projects</button>
        </Link>
      </div>

      


      <div className='container service-cards-container'>
        <h1 style={{ fontSize: '4rem', marginLeft: '30px' }}>Trainings By MetaBot</h1>
        <hr style={{ width: '180px', borderTop: '8px dotted', marginLeft: '30px', paddingBottom: '3rem' }} />
        <div className='row'>
          {trainingCards.map((card, index) => (
            <div key={index} className="col-lg-4 col-md-4 col-sm-12 mb-3">
              <MediaCard image={`${process.env.REACT_APP_API}/api/v1/training-cards/card-photo/${card._id}`} title={card.title} description={card.text} style={{ margin: '0 5px', padding: '10px' }} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ServicePage;
