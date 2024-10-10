import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function QuoteLineItems({ lineItems = [] }) { // Default value to prevent undefined
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="line items table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lineItems.map((item) => (
            <TableRow key={item.Id}>
              <TableCell>{item.Name}</TableCell>
              <TableCell>{item.Description}</TableCell>
              <TableCell>{item.Quantity}</TableCell>
              <TableCell>${item.UnitPrice}</TableCell>
              <TableCell>${item.TotalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default QuoteLineItems;
