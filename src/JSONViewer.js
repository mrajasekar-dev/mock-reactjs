import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ReactJson from 'react-json-view';
import axios from 'axios';
import dummyData from './dummyData'; // Import dummy data

function JSONViewer() {
    const [accountData, setAccountData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const accountId = urlParams.get('accountId');
  
      const apiEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://socrat-iq.onrender.com';
  
      const authenticateAndFetchData = async () => {
        try {
          const response = await axios.post(`${apiEndpoint}/salesforce/auth`, { account_id: accountId });
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
  
    // Determine which data to use
    const data = accountData && accountData.Opportunities && accountData.Opportunities.length > 0
      ? accountData.Opportunities
      : dummyData;
  
    if (isLoading) return <div>Loading...</div>;
  
    if (error) return <div>Error: {error}</div>;
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Account Data JSON
      </Typography>
      {data ? <ReactJson
        src={data}
        theme="summerfruit:inverted"
        collapsed={2}
        enableClipboard={true}
        displayDataTypes={false}
        displayObjectSize={false}
      /> : <p>Loading...</p>}
    </Container>
  );
}

export default JSONViewer;
