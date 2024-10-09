import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Opportunities from './components/Opportunities';
import './App.css';

function App() {
  // Account Data
  const account = {
    name: 'Acme Corporation',
    industry: 'Manufacturing',
    owner: 'Alice Johnson',
    location: 'Bangalore, India',
  };

  // Opportunities Data
  const data = [
    { id: 'opp1', name: 'Opportunity 1', stage: 'Qualification', owner: 'John Doe', closeDate: '2024-10-15', probability: '70%', quotes: [{ id: 'quote1', name: 'Quote 1', totalPrice: 5000, status: 'Draft', discount: '5%', quoteLineItems: [{ id: 'item1', name: 'Line Item 1', description: 'Product A', quantity: 2, price: 1500 }, { id: 'item2', name: 'Line Item 2', description: 'Product B', quantity: 1, price: 2000 }] }] },
    { id: 'opp2', name: 'Opportunity 2', stage: 'Proposal', owner: 'Jane Smith', closeDate: '2024-11-01', probability: '50%', quotes: [{ id: 'quote2', name: 'Quote 2', totalPrice: 8000, status: 'Sent', discount: '10%', quoteLineItems: [{ id: 'item3', name: 'Line Item 3', description: 'Service A', quantity: 5, price: 1000 }, { id: 'item4', name: 'Line Item 4', description: 'Service B', quantity: 3, price: 1500 }] }] },
    { id: 'opp3', name: 'Opportunity 3', stage: 'Negotiation', owner: 'Sara Lee', closeDate: '2024-10-20', probability: '90%', quotes: [{ id: 'quote3', name: 'Quote 3', totalPrice: 12000, status: 'Draft', discount: '8%', quoteLineItems: [{ id: 'item5', name: 'Line Item 5', description: 'Service C', quantity: 1, price: 12000 }] }] },
    { id: 'opp4', name: 'Opportunity 4', stage: 'Closed Won', owner: 'John Doe', closeDate: '2024-09-30', probability: '100%', quotes: [{ id: 'quote4', name: 'Quote 4', totalPrice: 15000, status: 'Accepted', discount: '0%', quoteLineItems: [{ id: 'item6', name: 'Line Item 6', description: 'Product C', quantity: 10, price: 1500 }] }] },
    { id: 'opp5', name: 'Opportunity 5', stage: 'Closed Lost', owner: 'Jane Smith', closeDate: '2024-08-15', probability: '0%', quotes: [{ id: 'quote5', name: 'Quote 5', totalPrice: 5000, status: 'Rejected', discount: '12%', quoteLineItems: [{ id: 'item7', name: 'Line Item 7', description: 'Service D', quantity: 5, price: 1000 }] }] }
  ];

  return (
    <div className="App container">
      <h1 className="main-heading">Opportunities, Quotes, and Quote Line Items</h1>
      <div className="account-details">
        <h2>Account Details</h2>
        <p><strong>Name:</strong> {account.name}</p>
        <p><strong>Industry:</strong> {account.industry}</p>
        <p><strong>Owner:</strong> {account.owner}</p>
        <p><strong>Location:</strong> {account.location}</p>
      </div>

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Open</Accordion.Header>
          <Accordion.Body>
            <div className="stages-container">
              <div className="stage-column">
                <h3>Qualification Stage</h3>
                <Accordion defaultActiveKey="0">
                  <Opportunities opportunities={data.filter(opportunity => opportunity.stage === 'Qualification')} />
                </Accordion>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>In-Progress</Accordion.Header>
          <Accordion.Body>
            <div className="stages-container">
              <div className="stage-column">
                <h3>Proposal Stage</h3>
                <Accordion defaultActiveKey="0">
                  <Opportunities opportunities={data.filter(opportunity => opportunity.stage === 'Proposal')} />
                </Accordion>
              </div>
              <div className="stage-column">
                <h3>Negotiation Stage</h3>
                <Accordion defaultActiveKey="0">
                  <Opportunities opportunities={data.filter(opportunity => opportunity.stage === 'Negotiation')} />
                </Accordion>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Closed</Accordion.Header>
          <Accordion.Body>
            <div className="stages-container">
              <div className="stage-column">
                <h3>Closed Won</h3>
                <Accordion defaultActiveKey="0">
                  <Opportunities opportunities={data.filter(opportunity => opportunity.stage === 'Closed Won')} />
                </Accordion>
              </div>
              <div className="stage-column">
                <h3>Closed Lost</h3>
                <Accordion defaultActiveKey="0">
                  <Opportunities opportunities={data.filter(opportunity => opportunity.stage === 'Closed Lost')} />
                </Accordion>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default App;
