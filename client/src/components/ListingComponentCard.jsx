import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { CSSTransition } from 'react-transition-group';
import '../css/ListingComponentCard.css'; // Import CSS file for styles

const ListingComponentCard = (props) => {
    const navigate = useNavigate();

    const handleApplyClick = (id) => {
        navigate(`/joblisting/${id}`);
    };

    return (
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
            <div className="card text-center custom-card">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">Last Date To Apply {props.date}</p>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{
                            mt: 2,
                            backgroundColor: '#28a745',
                            '&:hover': {
                                backgroundColor: '#218838',
                            },
                        }}
                        onClick={() => handleApplyClick(props.id)}
                        className="custom-button"
                    >
                        See More!
                    </Button>
                </div>
            </div>
        </CSSTransition>
    );
};

export default ListingComponentCard;
