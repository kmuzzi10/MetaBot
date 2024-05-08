import React from 'react'
import { Link } from 'react-router-dom';

const HomeCards = (props) => {
    const { image, title, text } = props;
    const truncatedText = text.length > 150 ? text.substring(0, 50) + "..." : text;

    return (
        <>
            <div className="card home-card" style={{ width: '200px', height: 'auto', marginBottom: '20px', marginRight: '10px', marginLeft: '10px' }}>
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img style={{ marginLeft: '20px', marginTop: '20px', width: '100px', height: '100px' }} src={image} alt='' className="img-fluid" />
                </div>
                <div className="card-body">
                    <h3 style={{fontSize:'1.3rem'}} className="card-title">{title}</h3>
                    <p className="card-text">
                        {truncatedText} {text.length > 50 && <Link to='/all-services'>See More</Link>}
                    </p>
                </div>
            </div>
        </>
    )
}

export default HomeCards;
