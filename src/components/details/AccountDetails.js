import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function AccountDetails({ account }) {
  return (
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
  );
}

export default AccountDetails;
