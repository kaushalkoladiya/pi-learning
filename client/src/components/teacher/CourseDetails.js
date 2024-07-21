import React from 'react';
import { Typography, Paper } from '@mui/material';

const CourseDetails = ({ course }) => {
  return (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="h6">Course Details</Typography>
      <Typography variant="body1">Title: {course.course_title}</Typography>
      <Typography variant="body1">Description: {course.long_description}</Typography>
    </Paper>
  );
};

export default CourseDetails;
