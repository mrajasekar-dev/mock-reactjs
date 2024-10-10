import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { blue } from '@mui/material/colors';

function QuoteLineItemCard({ lineItem, onClick, isClosedStage }) {
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 1, 
        bgcolor: isClosedStage ? 'white' : blue[25],
        '&:hover': {
          bgcolor: isClosedStage ? blue[50] : blue[100],
        },
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography variant="subtitle1" color={blue[700]}>{lineItem.name}</Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            Description: {lineItem.description}
          </Typography>
          <Typography variant="body2">
            Quantity: {lineItem.quantity} | Price: ${lineItem.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default QuoteLineItemCard;
