import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuoteLineItemCard from './QuoteLineItemCard';
import QuoteLineItemModal from './QuoteLineItemModal';
import { blue } from '@mui/material/colors';

function OpportunityAccordion({ opportunities, title, color, quoteColor, isClosedStage = false }) {
  const [expandedQuote, setExpandedQuote] = useState(null);
  const [selectedLineItem, setSelectedLineItem] = useState(null);

  const handleQuoteExpand = (quoteId) => (event, isExpanded) => {
    setExpandedQuote(isExpanded ? quoteId : null);
  };

  const handleLineItemClick = (lineItem) => {
    setSelectedLineItem(lineItem);
  };

  const handleCloseModal = () => {
    setSelectedLineItem(null);
  };

  return (
    <Box sx={{ bgcolor: color, p: 2, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom color={blue[700]}>{title}</Typography>
      {opportunities.length === 0 ? (
        <Typography variant="body1">No records to display</Typography>
      ) : (
        opportunities.map((opportunity) => (
          <Accordion key={opportunity.id} sx={{ bgcolor: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={blue[700]}>{opportunity.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Stage: {opportunity.stage}</Typography>
              <Typography>Owner: {opportunity.owner}</Typography>
              <Typography>Close Date: {opportunity.closeDate}</Typography>
              <Typography>Probability: {opportunity.probability}</Typography>
              
              {opportunity.quotes.map((quote) => (
                <Accordion 
                  key={quote.id} 
                  expanded={expandedQuote === quote.id} 
                  onChange={handleQuoteExpand(quote.id)}
                  sx={{ bgcolor: isClosedStage ? 'white' : quoteColor, mt: 2 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={blue[700]}>{quote.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Total Price: ${quote.totalPrice}</Typography>
                    <Typography>Status: {quote.status}</Typography>
                    <Typography>Discount: {quote.discount}</Typography>
                    
                    <Typography variant="subtitle1" gutterBottom color={blue[700]}>Line Items:</Typography>
                    <Grid container spacing={2}>
                      {quote.lineItems.map((lineItem) => (
                        <Grid item xs={12} sm={6} md={4} key={lineItem.id}>
                          <QuoteLineItemCard 
                            lineItem={lineItem} 
                            onClick={() => handleLineItemClick(lineItem)}
                            isClosedStage={isClosedStage}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))
      )}
      <QuoteLineItemModal 
        lineItem={selectedLineItem} 
        open={!!selectedLineItem} 
        onClose={handleCloseModal} 
      />
    </Box>
  );
}

export default OpportunityAccordion;
