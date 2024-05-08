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
        <div style={{ marginBottom: '20px' }}> {/* Add margin bottom for spacing between cards */}
            <Card style={{ backgroundColor: 'beige', color: 'black' }}>
                <Card.Img variant="top" src={props.image} style={{ width: '300px', height: '280px' }} />
                <Card.Body>
                    <Card.Text style={{ fontSize: '2rem' }}>
                        {props.title}
                    </Card.Text>
                    <Card.Text style={{ fontSize: '1.2rem' }}>
                        {expanded ? props.text : `${props.text.substring(0, 100)}`}
                    </Card.Text>
                    {/* Render "See More" link only if text length is greater than 100 */}
                    {props.text.length > 100 && (
                        <Link onClick={handleSeeMoreClick} style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer' }}>
                            See More
                        </Link>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}
