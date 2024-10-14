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

function MainComponent() {
  const [accountData, setAccountData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('accountId');
    const apiEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://your-api-endpoint.com';

    const fetchData = async () => {
        setIsLoading(true);  // Ensure loading state is set when the request starts
        try {
            const response = await axios.post(`${apiEndpoint}/salesforce/auth`, { account_id: accountId });
            console.log("API Response:", response.data);

            if (response.data && response.data.Opportunities) {
                const convertedData = convertAccountDataToDummyFormat(response.data);
                setAccountData(convertedData);
            } else {
                console.error("Malformed data or unexpected data structure:", response.data);
                setAccountData([]);  // Ensure state is updated even if data is malformed
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
        } finally {
            setIsLoading(false);  // Ensure loading state is cleared after the request
        }
    };

    fetchData();
}, []);

function convertAccountDataToDummyFormat(accountData) {
  console.log("Received account data:", JSON.stringify(accountData, null, 2));

  if (!accountData || !Array.isArray(accountData.Opportunities)) {
      console.error("Invalid account data: Missing 'Opportunities' array");
      return [];
  }

  return accountData.Opportunities.map(opportunity => {
      if (!opportunity.Quotes || !Array.isArray(opportunity.Quotes)) {
          console.error("Invalid opportunity data: Missing 'Quotes' array");
          return null; // Return null for opportunities without valid quotes array
      }

      return {
          id: opportunity.Id || 'Unknown ID',
          name: opportunity.Name || 'Unknown Name',
          stage: opportunity.StageName ? opportunity.StageName.split('/')[0] : 'Unknown Stage',
          owner: opportunity.OwnerId || 'Unknown Owner',
          closeDate: opportunity.CloseDate || 'Unknown Close Date',
          probability: `${opportunity.Probability || 0}%`,
          quotes: opportunity.Quotes.map(quote => {
              return {
                  id: quote.Id || 'Unknown Quote ID',
                  name: quote.Name || 'Unknown Quote Name',
                  totalPrice: quote.GrandTotal || 0,
                  status: quote.Status || 'Unknown Status',
                  discount: `${quote.Discount || 0}%`,
                  lineItems: quote.LineItems.map(lineItem => {
                      return {
                          id: lineItem.Id || 'Unknown Line Item ID',
                          name: lineItem.Name || 'Unknown Line Item Name',
                          description: lineItem.Description || 'No Description',
                          quantity: lineItem.Quantity || 0,
                          price: lineItem.UnitPrice || 0
                      };
                  })
              };
          })
      };
  }).filter(opportunity => opportunity !== null); // Filter out null values
}

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

  if (error) return <div>Error: {error.message}</div>;

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

export default MainComponent;
