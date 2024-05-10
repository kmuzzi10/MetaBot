import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import illustrationSoftwarePic from '../assets/HomePagePics/Meeting.gif';
import SliderReact from '../components/SliderReact';
import Cards from '../components/HomeCards';
import Swinger from '../components/swinger';
import { useInView } from 'react-intersection-observer';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API}/api/v1/service-cards`,
  // Add headers or other configurations here if needed
});

const HomePage = () => {
  const [cards, setCards] = useState([]);
  const [section1Ref, section1InView] = useInView({ threshold: 0.5 });
  const [section2Ref, section2InView] = useInView({ threshold: 0.5 });
  const [section3Ref, section3InView] = useInView({ threshold: 0.5 });
  const [section4Ref, section4InView] = useInView({ threshold: 0.5 });

  const gettingCards = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get('/get-cards');
      if (data?.success) {
        const limitedCards = data.cardsData.slice(0, 6);
        setCards(limitedCards);
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
      // Handle error gracefully, e.g., set error state
    }
  }, []);

  useEffect(() => {
    gettingCards();
  }, [gettingCards]);

  return (
    <Layout>
      <div
        ref={section1Ref}
        className={`fluid-container section-1 ${section1InView ? 'visible fade-in' : ''
          }`}
      >
        <div style={{ paddingTop: '50px',paddingLeft:'20px' }} className="fluid-container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 homepageSection1">
              <h1 className="ubuntu-bold" style={{paddingTop:'25px',fontSize:"6rem"}}>Team Of Professional IT Experts</h1>
              <h2
                className="ubuntu-medium"
                style={{ fontSize: '1.6rem', color: '#C3FF93', marginTop: '30px' }}
              >
                Aiming To Deliver Optimized And Efficient Solutions
              </h2>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 mt-3">
              {/* <img
                className="illustrationImage"
                width={'90%'}
                height={'100%'}
                src={illustrationSoftwarePic}
                alt=""
                loading="lazy"
              /> */}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={section2Ref}
        className={`container-fluid section-2 ${section2InView ? 'visible slide-in' : ''
          }`}
      >
        <SliderReact img1={illustrationSoftwarePic} />
      </div>

      <div
        ref={section3Ref}
        className={`fluid-container section-3 ${section3InView ? 'visible fade-in' : ''
          }`}
      >
        <div className="row section-3-row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <h3 className="roboto-medium">
              We Lead In The Market For Unique Purpose
            </h3>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 section3-text">
            <p style={{ fontSize: '1rem' }} className="roboto-regular">
              Metabot leads the market with a singular purpose: to redefine the landscape of software solutions. Our commitment to innovation, coupled with our relentless pursuit of excellence, sets us apart as industry trailblazers. At Metabot, we don't just follow trends; we set them. With a focus on creativity and cutting-edge technology, we empower businesses to transcend limitations and achieve their full potential. Join us at the forefront of innovation and experience the difference that sets Metabot apart from the rest.
            </p>
          </div>
        </div>
        {cards.length > 0 && (
          <div className="fluid-container home-cards">
            <div className="row home-cards-row">
              {cards.map((a, index) => (
                <div key={index} className="col-lg-4 col-md-4 col-sm-12 mb-3">
                  <Cards
                    image={a.image}
                    title={a.title}
                    text={a.text}
                    style={{ margin: '0 5px', padding: '10px' }}
                  />
                </div>
              ))}
            </div>
            <Link to="/all-services">
              <Button
                style={{ width: '200px', height: '50px', marginTop: '20px' }}
                variant="outline-success"
              >
                Show All Services
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div
        ref={section4Ref}
        className={`fluid-container section4-back ${section4InView ? 'visible slide-in' : ''
          }`}
      >
        <h1 className="ubuntu-bold">
          We Have A Professional Developers Team <br /> To Work On Professional
          Projects.
        </h1>
      </div>
      <div className="fluid-container swinger-class">
        <Swinger />
      </div>
    </Layout>
  );
};

export default HomePage;
