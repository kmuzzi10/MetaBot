import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/card.css'; // Import your CSS file for styling

const AboutServiceCards = ({ image, title, text, id }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        {expanded ? (
          <p className="card-text">{text}</p>
        ) : (
          <p className="card-text">{text.slice(0, 100)}</p>
        )}
        {text.length > 100 && (
          <Link to={`/all-services`} onClick={handleExpand} className="see-more">
            {expanded ? 'See less' : 'See more'}
          </Link>
        )}
      </div>
    </div>
  );
};

export default AboutServiceCards;
