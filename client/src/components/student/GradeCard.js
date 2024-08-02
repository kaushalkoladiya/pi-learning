import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const GradeCard = ({ grade }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Grade: {grade.grade}</Typography>
        <Typography variant="body2">{grade.feedback}</Typography>
      </CardContent>
    </Card>
  );
};

export default GradeCard;
