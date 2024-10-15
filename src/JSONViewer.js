import React, { useState, useEffect } from 'react';
import { Container, Accordion, AccordionSummary, AccordionDetails, Typography, Button, Modal, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import dummyData from './dummyData'; // Import dummy data

function JSONViewer() {
    const [accountData, setAccountData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
  
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const accountId = urlParams.get('accountId');
      const apiEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://socrat-iq.onrender.com';
  
      const authenticateAndFetchData = async () => {
          setIsLoading(true);
          try {
              const response = await axios.post(`${apiEndpoint}/salesforce/auth`, { account_id: accountId });
              console.log('API Response:', response.data); // Check what you actually received
              // Attempt to parse JSON if it's a string
              let data = response.data;
              if (typeof data === 'string') {
                  data = JSON.parse(data);
              }
              if (data) {
                  setAccountData(data);
              } else {
                  setAccountData(null);
                  console.log('No data available:', response.data);
              }
          } catch (error) {
              console.error('Error fetching data:', error);
              setError(error);
          } finally {
              setIsLoading(false);
          }
      };
  
      authenticateAndFetchData();
  }, []);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };
  
    // Determine which data to use
    const data = accountData ? accountData : dummyData;
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No account data available.</div>;
  
    return (
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mb: 4 }}>Account Opportunities</Typography>
        {data.map((opp, index) => (
          <OpportunityAccordion key={index} opportunity={opp} onOpenModal={handleOpenModal} />
        ))}
        <DetailsModal open={modalOpen} item={selectedItem} onClose={handleCloseModal} />
      </Container>
    );
}

function OpportunityAccordion({ opportunity, onOpenModal }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{opportunity.Name} - {opportunity.StageName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {opportunity.Quotes.map((quote, idx) => (
          <QuoteAccordion key={idx} quote={quote} onOpenModal={onOpenModal} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

function QuoteAccordion({ quote, onOpenModal }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{quote.Name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Button onClick={() => onOpenModal(quote)}>View Details</Button>
      </AccordionDetails>
    </Accordion>
  );
}

function DetailsModal({ open, item, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {item?.Name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {item?.Description || 'No additional details available.'}
        </Typography>
      </Box>
    </Modal>
  );
}

export default JSONViewer;
