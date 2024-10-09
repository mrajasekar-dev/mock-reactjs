import React from 'react';
import Collapsible from 'react-collapsible';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS for base styling (optional)
import './Quotes.css'; // Your own CSS styling

const Quotes = ({ quotes }) => {
  return (
    <div className="quote-collapsible-container">
      {quotes.map((quote, index) => (
        <Collapsible 
          key={quote.id} 
          trigger={<div className="collapsible-header">{quote.name} - Total Price: ${quote.totalPrice}</div>}
          className="collapsible-item"
          openedClassName="collapsible-item-opened"
        >
          <div className="quote-details">
            <p><strong>Status:</strong> {quote.status}</p>
            <p><strong>Discount:</strong> {quote.discount}</p>
          </div>
          {quote.quoteLineItems.map((item, idx) => (
            <Collapsible
              key={item.id}
              trigger={<div className="collapsible-header line-item-header">{item.name} - Quantity: {item.quantity}</div>}
              className="collapsible-item"
              openedClassName="collapsible-item-opened"
            >
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Price:</strong> ${item.price}</p>
            </Collapsible>
          ))}
        </Collapsible>
      ))}
    </div>
  );
};

export default Quotes;
