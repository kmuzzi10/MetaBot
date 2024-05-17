import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import SwingerTwo from '../components/SwingerTwo';
import MediaCard from '../components/MediaCard';
import AboutServiceCards from '../components/AboutServiceCards';
import NewsCards from '../components/NewsCards';
import axios from 'axios';
import { Link } from 'react-router-dom';
import innovationPic from "../assets/HomePagePics/aboutPageImages/cardImages/innovation.jpg";
import experiencePic from "../assets/HomePagePics/aboutPageImages/cardImages/experience.jpg";
import reliablePic from "../assets/HomePagePics/aboutPageImages/cardImages/reliable.jpg";
import integrationPic from "../assets/HomePagePics/aboutPageImages/cardImages/integration.jpg";
import servicePic from "../assets/HomePagePics/aboutPageImages/cardImages/service.jpg";
import section4Pic from "../assets/HomePagePics/servicesImages/52.jpg";

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API}/api/v1`,
});

const AboutPage = () => {
  const [cards, setCards] = useState([]);
  const [newsCards, setNewsCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const mediaCardData = [
    {
      image: innovationPic,
      title: 'Personalized Service',
      description: 'Receive dedicated attention and customized strategies to address your specific business challenges and goals',
    },
    {
      image: experiencePic,
      title: 'Seamless Integration',
      description: 'Ensure smooth compatibility and effortless integration with your existing systems and workflows',
    },
    {
      image: reliablePic,
      title: 'Proven Excellence',
      description: 'Trust our track record of delivering successful projects across diverse industries, backed by a commitment to your success.',
    },
    {
      image: integrationPic,
      title: 'Innovative Solutions',
      description: 'Elevate your business with cutting-edge technology tailored to your unique requirements',
    },
    {
      image: servicePic,
      title: 'Reliable Performance',
      description: 'Experience dependable software solutions engineered for excellence, reliability, and scalability',
    },
    {
      image: servicePic,
      title: 'Optimized Results',
      description: 'Cost and resource optimized software solutions that are efficient in working',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cardsRes, newsCardsRes] = await Promise.all([
          axiosInstance.get('/cards/get-cards'),
          axiosInstance.get('/news-cards/get-cards'),
        ]);
        if (cardsRes.data.success && newsCardsRes.data.success) {
          setCards(cardsRes.data.cardsData.slice(0, 3));
          setNewsCards(newsCardsRes.data.cardsData.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Section 1 */}
      <div className="container-fluid about-section1">
        <div className="row">
          <div className="col-lg-12 col-md-12 section-4-container-row col-sm-12">
            <div className='container'>
              <h1>Discover Why Metabot Stands Out <br /> As Your Top Choice in Software Solutions!</h1>
              <p style={{ fontSize: '1rem' }}>
                Discover why Metabot reigns supreme in software solutions! 🌟 <br /> With innovation as our cornerstone, we lead the way in excellence. 💻 <br /> Trust our expertise to propel your business forward with precision and efficiency. 🚀<br /> From concept to execution, we deliver bespoke solutions tailored to your needs. 🔍<br /> Experience the difference with Metabot – where every line of code is crafted with passion. 💼<br /> Choose us as your trusted partner in navigating the digital landscape.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="container-fluid">
        <SwingerTwo />
      </div>

      {/* Section 4 */}
      <div className="container section-4-container-about">
        <h1 className='about-heading-choose'>Why Choose Us</h1>
        <div className="row about-row">
          {mediaCardData.map((data, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-3">
              <MediaCard image={data.image} title={data.title} description={data.description} />
            </div>
          ))}
        </div>
      </div>

      {/* Section 4 */}
      <div className="container">
        <h1 style={{ fontSize: '4rem' }}>Our Promise To You</h1>
        <hr style={{ width: '180px', borderTop: '8px dotted', marginLeft: '10px', paddingBottom: '3rem' }} />
        <div className="row" style={{ paddingTop: '30px' }}>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <img className="imageService" width={'100%'} height={'100%'} src={section4Pic} alt="servicePicture" />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 serviceContent">
            <p style={{ fontSize: '1.2rem' }}>🚀 Welcome to MetaBot 🤖<br />
              Experience, Excellence, and Exceptional Service – that's our promise.<br /><br />
              🌟 Experienced Team: Trust our seasoned experts to bring your vision to life.<br />
              🤝 Customer-Centric Approach: Your success is our priority, from start to finish.<br />
              💡 Innovative Solutions: Embrace cutting-edge technology and forward-thinking strategies.<br />
              🔒 Trust & Transparency: Count on us for open communication and reliable partnership.<br />
              🌐 Global Reach, Local Touch: Wherever you are, we're here to deliver top-notch service.<br />
              MetaBot: Your Partner in Digital Innovation.</p>
          </div>
        </div>
      </div>

      {/* Section 5 */}
      <div style={{ marginTop: '100px' }} className="fluid-container news-container">
        <h1>Latest News From Our Side</h1>
        <hr style={{ width: '180px', borderTop: '8px dotted white', margin: '0 auto' }} />

        <div style={{ marginTop: '20px' }} className="row">
          {newsCards.map((a, index) => (
            <div key={index} className="col-lg-6 col-md-12 col-sm-12">
              <NewsCards image={`${process.env.REACT_APP_API}/api/v1/news-cards/card-photo/${a._id}`} text={a.text} title={a.title} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
