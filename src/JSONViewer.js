import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dummyData from './dummyData'; // Import dummy data
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Modal, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#f5f5f5', // Lighter background for the container
        padding: theme.spacing(4),
        borderRadius: '12px', // Rounded container
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    accordion: {
        backgroundColor: '#ffffff', // White background for accordion
        margin: theme.spacing(1, 0),
        borderRadius: '12px', // Rounded accordion
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    accordionSummary: {
        backgroundColor: '#e0e0e0', // Lighter accordion summary background
        color: '#000000', // Darker text for contrast
        borderRadius: '12px 12px 0 0', // Rounded top corners
        '&:hover': {
            backgroundColor: '#d0d0d0', // Slightly darker on hover
        },
    },
    accordionDetails: {
        backgroundColor: '#f9f9f9', // Very light background for details
        borderRadius: '0 0 12px 12px', // Rounded bottom corners
        padding: theme.spacing(2), // Added padding for better spacing
    },
    modal: {
        padding: '20px',
        backgroundColor: '#ffffff', // White background for modal
        margin: '100px auto',
        width: '400px',
        borderRadius: '12px', // Rounded modal
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        border: '1px solid #e0e0e0', // Light border for definition
        outline: 'none', // Removed default outline
    },
    button: {
        backgroundColor: '#b3e5fc', // Changed to a lighter blue button color
        color: '#000000', // Dark text for contrast
        borderRadius: '8px', // Rounded button edges
        '&:hover': {
            backgroundColor: '#81d4fa', // Slightly darker blue on hover
        },
    },
    quoteItem: {
        borderRadius: '8px', // Rounded edges for quote items
        padding: theme.spacing(1), // Added padding for better spacing
        backgroundColor: '#ffffff', // Background for quote items
        margin: theme.spacing(1, 0), // Margin for spacing
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)', // Light shadow for depth
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
                Opportunities, Quotes and Quote Line Items
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
                            <Typography variant="h6" gutterBottom>{selectedQuote.Name}</Typography>
                            <Typography variant="body1">Quote Number: <strong>{selectedQuote.QuoteNumber}</strong></Typography>
                            <Typography variant="body1">Valid From: <strong>{selectedQuote.ValidFrom}</strong></Typography>
                            <Typography variant="body1">Valid Until: <strong>{selectedQuote.ValidUntil}</strong></Typography>
                            <Typography variant="body1">Status: <strong>{selectedQuote.Status}</strong></Typography>
                            <Typography variant="body1">Description: <strong>{selectedQuote.Description}</strong></Typography>
                            <Typography variant="h6" gutterBottom>Line Items:</Typography>
                            {selectedQuote.LineItems.map((item, idx) => (
                                <Typography key={idx} variant="body2" className={classes.quoteItem}>
                                    {item.Quantity} x <strong>{item.ProductName}</strong> - <strong>${item.TotalPrice}</strong>
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
