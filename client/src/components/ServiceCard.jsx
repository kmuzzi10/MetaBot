import React from 'react';
import { Link } from 'react-router-dom';
import '../css/servicecard.css'; // Import your CSS file for styling

const ServiceCard = ({ image, title, text, nextPage }) => {
  const truncatedText = text.length > 10 ? `${text.substring(0, 100)}...` : text;

  const handleClick = () => {
    if (nextPage) {
      window.location.href = '/all-services'; // Redirect to next page
    }
  };

  return (
    <div className="service-card">
      <div className="card-image-container">
        <img src={image} alt={title} className="card-image" />
      </div>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">
          {truncatedText} {text.length > 150 && <Link to='/all-services'>See More</Link>}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;






