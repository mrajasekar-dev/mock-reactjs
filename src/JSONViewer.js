import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dummyData from './dummyData'; // Import dummy data
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Modal, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#f5f5f5',
        padding: theme.spacing(4),
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    accordion: {
        backgroundColor: '#ffffff',
        margin: theme.spacing(1, 0),
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    accordionSummary: {
        backgroundColor: '#3f51b5',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#303f9f',
        },
    },
    accordionDetails: {
        backgroundColor: '#e3f2fd',
    },
    modal: {
        padding: '20px',
        backgroundColor: '#ffffff',
        margin: '100px auto',
        width: '400px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    },
    button: {
        backgroundColor: '#3f51b5',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#303f9f',
        },
    },
}));

function JSONViewer() {
    const classes = useStyles();
    const [accountData, setAccountData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accountId = urlParams.get('accountId');
        const apiEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://socrat-iq.onrender.com';

        const authenticateAndFetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.post(`${apiEndpoint}/salesforce/auth`, { account_id: accountId });
                let data = response.data;
                if (typeof data === 'string') {
                    data = JSON.parse(data);
                }
                if (data) {
                    setAccountData(data);
                } else {
                    setAccountData(null);
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        authenticateAndFetchData();
    }, []);

    const handleOpenModal = (quote) => {
        setSelectedQuote(quote);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedQuote(null);
    };

    const data = accountData ? accountData : dummyData;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No account data available.</div>;

    return (
        <Container className={classes.container}>
            <Typography variant="h4" gutterBottom align="center" color="primary">
                Account Data JSON
            </Typography>
            {data.Opportunities.map((opportunity, index) => (
                <Accordion key={index} className={classes.accordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordionSummary}>
                        <Typography>{opportunity.Name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        <Typography>
                            Stage: {opportunity.StageName} <br />
                            Amount: ${opportunity.Amount} <br />
                            <Button variant="contained" className={classes.button} onClick={() => handleOpenModal(opportunity.Quotes[0])}>
                                View Quote
                            </Button>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box className={classes.modal}>
                    {selectedQuote && (
                        <>
                            <Typography variant="h6">{selectedQuote.Name}</Typography>
                            <Typography>Quote Number: {selectedQuote.QuoteNumber}</Typography>
                            <Typography>Valid From: {selectedQuote.ValidFrom}</Typography>
                            <Typography>Valid Until: {selectedQuote.ValidUntil}</Typography>
                            <Typography>Status: {selectedQuote.Status}</Typography>
                            <Typography>Description: {selectedQuote.Description}</Typography>
                            <Typography>Line Items:</Typography>
                            {selectedQuote.LineItems.map((item, idx) => (
                                <Typography key={idx}>
                                    {item.Quantity} x {item.ProductName} - ${item.TotalPrice}
                                </Typography>
                            ))}
                            <Button className={classes.button} onClick={handleCloseModal}>Close</Button>
                        </>
                    )}
                </Box>
            </Modal>
        </Container>
    );
}

export default JSONViewer;
