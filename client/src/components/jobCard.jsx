import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import moment from "moment"

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API}/api/v1/job-cards`,
});

export default function JobCard(props) {
    const navigate = useNavigate();

    const [cards, setCards] = React.useState([]);

    const gettingCards = React.useCallback(async () => {
        try {
            const { data } = await axiosInstance.get('/get-cards');
            if (data?.success) {
                const limitedCards = data.cardsData
                setCards(limitedCards);
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    }, []);

    React.useEffect(() => {
        gettingCards();
    }, [gettingCards]);

    const handleApplyClick = (id) => {

        navigate(`/upload-pdf/${id}`);

    };

    return (
        <Card
            sx={{
                maxWidth: 800, // Increase the maxWidth here
                border: '1px solid #ddd',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                },
            }}
        >
            <CardActionArea>
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                            fontWeight: 'bold',
                            color: '#333',
                        }}
                    >
                        {props.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mb: 2,
                            color: '#666',
                        }}
                    >
                        {props.text}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mb: 2,
                            color: '#666',
                        }}
                    >
                        Last Date To Apply {props.date}
                    </Typography>
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
                    >
                        Apply Now!
                    </Button>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
