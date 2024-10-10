import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function QuoteAccordion({ quotes }) {
  return (
    <Box sx={{ mt: 2 }}>
      {quotes.length > 0 ? (
        quotes.map(quote => (
          <Accordion key={quote.id} sx={{ boxShadow: 1, mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{quote.name} - Total Price: ${quote.totalPrice}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography><strong>Status:</strong> {quote.status}</Typography>
              <Typography><strong>Discount:</strong> {quote.discount}</Typography>
              {quote.lineItems.length > 0 ? (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>Line Items:</Typography>
                  {quote.lineItems.map(lineItem => (
                    <Box key={lineItem.id} sx={{ mb: 1, pl: 2 }}>
                      <Typography><strong>{lineItem.name}</strong></Typography>
                      <Typography>Description: {lineItem.description}</Typography>
                      <Typography>Quantity: {lineItem.quantity}</Typography>
                      <Typography>Price: ${lineItem.price}</Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography>No Line Items Available</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography>No Quotes Available</Typography>
      )}
    </Box>
  );
}

export default QuoteAccordion;
