import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CourseCard = ({ course }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>{course.course_title}</Typography>
        <Typography variant="body2" color="textSecondary">{course.short_description}</Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
