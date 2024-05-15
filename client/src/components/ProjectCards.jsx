import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function ProjectCards(props) {
    return (
        <Box sx={{ marginBottom: 2, maxWidth: 600, mx: 'auto' }}> {/* Set container max width for horizontal card */}
            <Card raised sx={{ display: 'flex', backgroundColor: '#fff', color: '#333', boxShadow: 3 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 300, objectFit: 'cover' }} // Decrease width for the image
                    image={props.image}
                    alt={props.title}
                />
                <CardContent sx={{ flex: '1' }}> {/* Flex property to use remaining space */}
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.text}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
