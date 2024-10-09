import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Box, Button, Card, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Opportunities from './components/Opportunities';
import './App.css';

function App() {
  const account = {
    name: 'Acme Corporation',
    industry: 'Manufacturing',
    owner: 'Alice Johnson',
    location: 'Bangalore, India',
  };

  const data = [
    { id: 'opp1', name: 'Opportunity 1', stage: 'Qualification', owner: 'John Doe', closeDate: '2024-10-15', probability: '70%', quotes: [] },
    { id: 'opp2', name: 'Opportunity 2', stage: 'Proposal', owner: 'Jane Smith', closeDate: '2024-11-01', probability: '50%', quotes: [] },
    { id: 'opp3', name: 'Opportunity 3', stage: 'Negotiation', owner: 'Sara Lee', closeDate: '2024-10-20', probability: '90%', quotes: [] },
    { id: 'opp4', name: 'Opportunity 4', stage: 'Closed Won', owner: 'John Doe', closeDate: '2024-09-30', probability: '100%', quotes: [] },
    { id: 'opp5', name: 'Opportunity 5', stage: 'Closed Lost', owner: 'Jane Smith', closeDate: '2024-08-15', probability: '0%', quotes: [] },
  ];

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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1e88e5' }}>
        Opportunities, Quotes, and Quote Line Items
      </Typography>

      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent sx={{ p: 3, bgcolor: '#e3f2fd', borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Account Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography><strong>Name:</strong> {account.name}</Typography>
              <Typography><strong>Industry:</strong> {account.industry}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography><strong>Owner:</strong> {account.owner}</Typography>
              <Typography><strong>Location:</strong> {account.location}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Button variant="contained" color="primary" onClick={handleToggleAll} sx={{ mb: 2 }}>
        {(expandedPanels.open && expandedPanels.inProgress && expandedPanels.closed) ? 'Collapse All' : 'Expand All'}
      </Button>

      <Accordion expanded={expandedPanels.open} onChange={handleAccordionChange('open')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#1976d2', color: '#fff', borderRadius: 1, mb: 1 }}>
          <Typography variant="h6">Open Opportunities</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#1e88e5' }}>Qualification Stage</Typography>
                  {data.filter(opp => opp.stage === 'Qualification').length > 0 ? (
                    data.filter(opp => opp.stage === 'Qualification').map(opportunity => (
                      <Accordion key={opportunity.id} sx={{ boxShadow: 1, mb: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>{opportunity.name} - Owner: {opportunity.owner}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography><strong>Close Date:</strong> {opportunity.closeDate}</Typography>
                          <Typography><strong>Probability:</strong> {opportunity.probability}</Typography>
                          <Opportunities opportunities={[opportunity]} />
                        </AccordionDetails>
                      </Accordion>
                    ))
                  ) : (
                    <Typography align="center" sx={{ color: '#757575' }}>No Opportunities Available</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expandedPanels.inProgress} onChange={handleAccordionChange('inProgress')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#1976d2', color: '#fff', borderRadius: 1, mb: 1 }}>
          <Typography variant="h6">In-Progress Opportunities</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {['Proposal', 'Negotiation'].map(stage => (
              <Grid item xs={12} md={6} key={stage}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#1e88e5' }}>{stage} Stage</Typography>
                    {data.filter(opp => opp.stage === stage).length > 0 ? (
                      data.filter(opp => opp.stage === stage).map(opportunity => (
                        <Accordion key={opportunity.id} sx={{ boxShadow: 1, mb: 1 }}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{opportunity.name} - Owner: {opportunity.owner}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography><strong>Close Date:</strong> {opportunity.closeDate}</Typography>
                            <Typography><strong>Probability:</strong> {opportunity.probability}</Typography>
                            <Opportunities opportunities={[opportunity]} />
                          </AccordionDetails>
                        </Accordion>
                      ))
                    ) : (
                      <Typography align="center" sx={{ color: '#757575' }}>No Opportunities Available</Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expandedPanels.closed} onChange={handleAccordionChange('closed')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#1976d2', color: '#fff', borderRadius: 1, mb: 1 }}>
          <Typography variant="h6">Closed Opportunities</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {['Closed Won', 'Closed Lost'].map(stage => (
              <Grid item xs={12} md={6} key={stage}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#1e88e5' }}>{stage} Stage</Typography>
                    {data.filter(opp => opp.stage === stage).length > 0 ? (
                      data.filter(opp => opp.stage === stage).map(opportunity => (
                        <Accordion key={opportunity.id} sx={{ boxShadow: 1, mb: 1 }}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{opportunity.name} - Owner: {opportunity.owner}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography><strong>Close Date:</strong> {opportunity.closeDate}</Typography>
                            <Typography><strong>Probability:</strong> {opportunity.probability}</Typography>
                            <Opportunities opportunities={[opportunity]} />
                          </AccordionDetails>
                        </Accordion>
                      ))
                    ) : (
                      <Typography align="center" sx={{ color: '#757575' }}>No Opportunities Available</Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default App;