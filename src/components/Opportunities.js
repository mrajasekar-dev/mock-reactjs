import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

const Opportunities = ({ opportunities }) => {
  return (
    <>
      {opportunities.map((opportunity, index) => (
        <Accordion.Item eventKey={index.toString()} key={opportunity.id}>
          <Accordion.Header>{opportunity.name} - {opportunity.stage}</Accordion.Header>
          <Accordion.Body>
            <div className="opportunity-details-grid">
              <div><strong>Owner:</strong> {opportunity.owner}</div>
              <div><strong>Close Date:</strong> {opportunity.closeDate}</div>
              <div><strong>Probability:</strong> {opportunity.probability}</div>
            </div>
            <Accordion defaultActiveKey="0">
              {opportunity.quotes.map((quote, idx) => (
                <Accordion.Item eventKey={idx.toString()} key={quote.id}>
                  <Accordion.Header>{quote.name} - Total Price: ${quote.totalPrice}</Accordion.Header>
                  <Accordion.Body>
                    <div className="quote-details">
                      <p><strong>Status:</strong> {quote.status}</p>
                      <p><strong>Discount:</strong> {quote.discount}</p>
                    </div>
                    <Accordion defaultActiveKey="0">
                      {quote.quoteLineItems.map((item, idy) => (
                        <Accordion.Item eventKey={idy.toString()} key={item.id}>
                          <Accordion.Header>{item.name} - Quantity: {item.quantity}</Accordion.Header>
                          <Accordion.Body>
                            <p><strong>Description:</strong> {item.description}</p>
                            <p><strong>Price:</strong> ${item.price}</p>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </>
  );
};

export default Opportunities;
