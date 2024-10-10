import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Quotes from './Quotes';

function Opportunities({ opportunities }) {
  return (
    <>
      {opportunities.map((opportunity) => (
        <Accordion key={opportunity.Id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${opportunity.Id}-content`}
            id={`${opportunity.Id}-header`}
          >
            <Typography>
              {opportunity.Name} - Owner: {opportunity.Owner}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              <strong>Close Date:</strong> {opportunity.CloseDate}
              <br />
              <strong>Probability:</strong> {opportunity.Probability}
            </Typography>
            <Quotes quotes={opportunity.Quotes} />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export default Opportunities;
