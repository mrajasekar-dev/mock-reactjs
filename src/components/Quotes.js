import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuoteLineItems from './QuoteLineItems';

function Quotes({ quotes = [] }) { // Default value to prevent undefined
  return (
    <>
      {quotes.map((quote) => (
        <Accordion key={quote.Id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${quote.Id}-content`}
            id={`${quote.Id}-header`}
          >
            <Typography>
              {quote.Name} - Total Price: ${quote.GrandTotal}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              <strong>Status:</strong> {quote.Status}
              <br />
              <strong>Discount:</strong> {quote.Discount}%
              <br />
              <strong>GST:</strong> {quote.GST}%
              <br />
              <strong>Valid From:</strong> {quote.ValidFrom}
              <br />
              <strong>Valid Until:</strong> {quote.ValidUntil}
            </Typography>
            <QuoteLineItems lineItems={quote.LineItems || []} />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export default Quotes;
