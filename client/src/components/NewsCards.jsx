import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

export default function NewsCards(props) {
    const [expanded, setExpanded] = useState(false);

    const handleSeeMoreClick = () => {
        // Redirect to another page when "See More" is clicked
        window.location.href = '/all-news';
    };

    return (
        <div style={{ marginBottom: '20px', maxWidth: '100%', display: 'flex', justifyContent: 'center' }}> {/* Adjust container for horizontal card */}
            <Card style={{ backgroundColor: 'white', color: 'black', border: '1px solid #064420', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '90%', maxWidth: '800px' }}> {/* Set up horizontal card */}
                <div style={{ flex: '1 1 auto', maxWidth: '50%' }}>
                    <img
                        src={props.image}
                        alt=""
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                        }}
                    />
                </div>
                <Card.Body style={{ flex: '1 1 auto', maxWidth: '50%' }}>
                    <Card.Text style={{ fontSize: '1.5rem', color: 'black', fontWeight: 'bold' }}> {/* Large text in black */}
                        {props.title}
                    </Card.Text>
                    <Card.Text style={{ fontSize: '1rem', color: 'black' }}> {/* Smaller text in light grey */}
                       {props.text}
                    </Card.Text>
                    {props.text.length > 100 && (
                        <Link to="/all-news" onClick={handleSeeMoreClick} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer', fontSize: '1rem' }}> {/* Green link */}
                            See More
                        </Link>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}
