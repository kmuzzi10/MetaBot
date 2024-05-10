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
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}> {/* Set max width for smaller cards */}
            <Card style={{ backgroundColor: 'beige', color: 'black' }}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                        src={props.image}
                        alt=""
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            transition: 'transform 0.3s ease-in-out'
                        }}
                    />
                </div>
                <Card.Body>
                    <Card.Text style={{ fontSize: '1.5rem' }}> {/* Reduce font size */}
                        {props.title}
                    </Card.Text>
                    <Card.Text style={{ fontSize: '1rem' }}> {/* Reduce font size */}
                        {expanded ? props.text : `${props.text.substring(0, 100)}`}
                    </Card.Text>
                    {/* Render "See More" link only if text length is greater than 100 */}
                    {props.text.length > 100 && (
                        <Link onClick={handleSeeMoreClick} style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer', fontSize: '1rem' }}> {/* Reduce font size */}
                            See More
                        </Link>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}
