import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';  // Import Box component for additional styling

export default function MediaCard(props) {
  return (
    <Box sx={{ padding: 2 , minHeight: '20vh' }}>  {/* Box wrapper for background */}
      <Card sx={{ 
        maxWidth: 345, 
        bgcolor: 'black', 
        color: 'white', 
        m: 2,  // margin for spacing around each card
        borderRadius: 2, // border radius
        boxShadow: '0 8px 16px 0 rgba(255, 255, 255, 0.2)'  // subtle white shadow for aesthetics
      }}>
        <CardMedia
          sx={{ height: 140 }}
          image={props.image}
          title={props.title}  // Changed to props.title for more accurate alt text
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ color: 'white' }}>
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
