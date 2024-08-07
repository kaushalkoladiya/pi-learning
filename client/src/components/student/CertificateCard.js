import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CertificateCard = ({ certificate }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{certificate.name}</Typography>
        <Typography variant="body2">Issued on: {certificate.issueDate}</Typography>
      </CardContent>
    </Card>
  );
};

export default CertificateCard;
