import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const AssignmentCard = ({ assignment }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>{assignment.assignment_name}</Typography>
        <Typography variant="body2" color="textSecondary">{assignment.due_date}</Typography>
        <Typography variant="body2" color="textSecondary">{assignment.course.course_title}</Typography>
        <Button variant="contained" color="primary" href={assignment.assignment_url} target="_blank" sx={{ mt: 1 }}>
          Download Assignment
        </Button>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;
