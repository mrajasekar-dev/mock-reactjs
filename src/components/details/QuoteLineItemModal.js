import React from 'react';
import { Modal, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function QuoteLineItemModal({ lineItem, open, onClose }) {
  if (!lineItem) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="quote-line-item-modal"
      aria-describedby="quote-line-item-details"
    >
      <Card sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>{lineItem.name}</Typography>
          <Typography variant="body1" paragraph>{lineItem.description}</Typography>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Property</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Quantity</TableCell>
                  <TableCell>{lineItem.quantity}</TableCell>
                </TableRow>
                <TableCell>Price</TableCell>
                  <TableCell>${lineItem.price}</TableCell>
                <TableRow>
                </TableRow>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>${lineItem.quantity * lineItem.price}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Modal>
  );
}

export default QuoteLineItemModal;
