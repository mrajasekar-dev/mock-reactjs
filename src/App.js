import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountDetails from './components/details/AccountDetails';
import OpportunityAccordion from './components/details/OpportunityAccordion';
import './App.css';
import Grid from '@mui/material/Grid';
import { blue } from '@mui/material/colors';

function App() {
  const [accountData, setAccountData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Your original dummy data
  const dummyData = [
    {
      id: 'opp1',
      name: 'Enterprise CRM Implementation',
      stage: 'Qualification',
      owner: 'John Doe',
      closeDate: '2024-09-30',
      probability: '30%',
      quotes: [
        {
          id: 'quote1',
          name: 'Initial CRM Setup',
          totalPrice: 150000,
          status: 'Draft',
          discount: '5%',
          lineItems: [
            {
              id: 'lineItem1',
              name: 'CRM Software License',
              description: 'Annual subscription for 500 users',
              quantity: 1,
              price: 100000,
            },
            {
              id: 'lineItem2',
              name: 'Implementation Services',
              description: 'Basic setup and configuration',
              quantity: 200,
              price: 250,
            },
          ],
        },
      ],
    },
    {
      id: 'opp2',
      name: 'Cloud Migration Project',
      stage: 'Proposal',
      owner: 'Jane Smith',
      closeDate: '2024-11-15',
      probability: '60%',
      quotes: [
        {
          id: 'quote2',
          name: 'Cloud Migration Services',
          totalPrice: 280000,
          status: 'Sent',
          discount: '10%',
          lineItems: [
            {
              id: 'lineItem3',
              name: 'Cloud Infrastructure Setup',
              description: 'Design and implementation of cloud architecture',
              quantity: 1,
              price: 150000,
            },
            {
              id: 'lineItem4',
              name: 'Data Migration',
              description: 'Transfer of existing data to cloud platforms',
              quantity: 500,
              price: 200,
            },
            {
              id: 'lineItem5',
              name: 'Training Sessions',
              description: 'Staff training on new cloud systems',
              quantity: 10,
              price: 3000,
            },
          ],
        },
      ],
    },
    {
      id: 'opp3',
      name: 'Cybersecurity Enhancement',
      stage: 'Negotiation',
      owner: 'Mike Wilson',
      closeDate: '2024-08-31',
      probability: '80%',
      quotes: [
        {
          id: 'quote3',
          name: 'Comprehensive Security Package',
          totalPrice: 220000,
          status: 'In Negotiation',
          discount: '7.5%',
          lineItems: [
            {
              id: 'lineItem6',
              name: 'Firewall Upgrade',
              description: 'Next-gen firewall implementation',
              quantity: 1,
              price: 75000,
            },
            {
              id: 'lineItem7',
              name: 'Endpoint Protection',
              description: 'Advanced endpoint security software - 1000 licenses',
              quantity: 1000,
              price: 50,
            },
            {
              id: 'lineItem8',
              name: 'Security Audit',
              description: 'Comprehensive security assessment and report',
              quantity: 1,
              price: 95000,
            },
          ],
        },
      ],
    },
    {
      id: 'opp4',
      name: 'AI-Powered Analytics Platform',
      stage: 'Closed Won',
      owner: 'Emily Chen',
      closeDate: '2024-06-15',
      probability: '100%',
      quotes: [
        {
          id: 'quote4',
          name: 'Analytics Platform Implementation',
          totalPrice: 500000,
          status: 'Accepted',
          discount: '12%',
          lineItems: [
            {
              id: 'lineItem9',
              name: 'AI Analytics Software',
              description: 'Enterprise license for AI-driven analytics platform',
              quantity: 1,
              price: 350000,
            },
            {
              id: 'lineItem10',
              name: 'Custom Integration',
              description: 'Integration with existing data sources and systems',
              quantity: 300,
              price: 500,
            },
            {
              id: 'lineItem11',
              name: 'Advanced Training Program',
              description: 'Comprehensive training for data scientists and analysts',
              quantity: 1,
              price: 50000,
            },
          ],
        },
      ],
    },
    {
      id: 'opp5',
      name: 'IoT Solution for Manufacturing',
      stage: 'Closed Lost',
      owner: 'Alex Turner',
      closeDate: '2024-05-31',
      probability: '0%',
      quotes: [
        {
          id: 'quote5',
          name: 'IoT Implementation and Consulting',
          totalPrice: 750000,
          status: 'Rejected',
          discount: '5%',
          lineItems: [
            {
              id: 'lineItem12',
              name: 'IoT Sensors and Devices',
              description: 'Industrial-grade IoT sensors - 1000 units',
              quantity: 1000,
              price: 250,
            },
            {
              id: 'lineItem13',
              name: 'IoT Platform Setup',
              description: 'Custom IoT platform development and implementation',
              quantity: 1,
              price: 400000,
            },
            {
              id: 'lineItem14',
              name: 'Consulting Services',
              description: 'IoT strategy and optimization consulting',
              quantity: 500,
              price: 300,
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('accountData');
    
    if (encodedData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(encodedData));
        setAccountData(decodedData);
      } catch (error) {
        console.error('Error parsing account data:', error);
        setError('Error parsing account data');
      }
    }
    setIsLoading(false);
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