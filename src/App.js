import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountDetails from './components/details/AccountDetails';
import OpportunityAccordion from './components/details/OpportunityAccordion';
import './App.css';
import Grid from '@mui/material/Grid';
import { blue } from '@mui/material/colors';
import axios from 'axios';
import dummyData from './dummyData'; // Import dummy data

function App() {
  const [accountData, setAccountData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');

    const apiEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://socrat-iq.onrender.com';

    const authenticateAndFetchData = async () => {
      try {
        const response = await axios.post(`${apiEndpoint}/salesforce/auth`, {
          account_id: accountId,
        });
        console.log('Account Data:', response.data);
        setAccountData(response.data); // Set account data
      } catch (error) {
        console.error('Error fetching Salesforce data:', error);
        setError(error); // Set error state
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    authenticateAndFetchData();
  }, []);

  const [expandedPanels, setExpandedPanels] = React.useState({
    open: false,
    inProgress: false,
    closed: false,
  });

  const handleToggleAll = () => {
    const expandAll = !expandedPanels.open && !expandedPanels.inProgress && !expandedPanels.closed;
    setExpandedPanels({
      open: expandAll,
      inProgress: expandAll,
      closed: expandAll,
    });
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanels((prevState) => ({
      ...prevState,
      [panel]: isExpanded,
    }));
  };

  // Determine which data to use
  const data = accountData && accountData.Opportunities && accountData.Opportunities.length > 0 
    ? accountData.Opportunities 
    : dummyData;

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', color: blue[700] }}>
        Opportunities, Quotes, and Quote Line Items
      </Typography>

      <AccountDetails account={accountData && accountData.Account ? accountData.Account : {
        name: 'TechCorp Solutions',
        industry: 'Information Technology',
        owner: 'Sarah Johnson',
        location: 'San Francisco, CA',
      }} />

      <Button variant="contained" color="primary" onClick={handleToggleAll} sx={{ mb: 2, bgcolor: blue[100], color: blue[700] }}>
        {(expandedPanels.open && expandedPanels.inProgress && expandedPanels.closed) ? 'Collapse All' : 'Expand All'}
      </Button>

      <Accordion expanded={expandedPanels.open} onChange={handleAccordionChange('open')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: blue[50], color: blue[700], borderRadius: 1, mb: 1 }}>
          <Typography variant="h6">Open Opportunities</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <OpportunityAccordion 
                opportunities={data.filter(opp => opp.stage === 'Qualification')} 
                title="Qualification Stage" 
                color={blue[50]}
                quoteColor={blue[100]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Add another stage here if needed */}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expandedPanels.inProgress} onChange={handleAccordionChange('inProgress')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: blue[50], color: blue[700], borderRadius: 1, mb: 1 }}>
          <Typography variant="h6">In-Progress Opportunities</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <OpportunityAccordion 
                opportunities={data.filter(opp => opp.stage === 'Proposal')} 
                title="Proposal Stage" 
                color={blue[50]}
                quoteColor={blue[100]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <OpportunityAccordion 
                opportunities={data.filter(opp => opp.stage === 'Negotiation')} 
                title="Negotiation Stage" 
                color={blue[50]}
                quoteColor={blue[100]}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expandedPanels.closed} onChange={handleAccordionChange('closed')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: blue[50], color: blue[700], borderRadius: 1, mb: 1 }}>
          <Typography variant="h6">Closed Opportunities</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <OpportunityAccordion 
                opportunities={data.filter(opp => opp.stage === 'Closed Won')} 
                title="Closed Won Stage" 
                color={blue[50]}
                quoteColor={blue[100]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <OpportunityAccordion 
                opportunities={data.filter(opp => opp.stage === 'Closed Lost')} 
                title="Closed Lost Stage" 
                color={blue[50]}
                quoteColor={blue[100]}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default App;
