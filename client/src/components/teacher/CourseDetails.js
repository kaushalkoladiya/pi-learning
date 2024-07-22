import React from 'react';
import { Typography, Card, CardContent, CardMedia, Box, Paper } from '@mui/material';

const CourseDetails = ({ course }) => {
  return (

    <Card elevation={3} style={{ marginBottom: '16px' }}>
      {course ? (
        <>
          {course.profile_pic && (
            <CardMedia
              component="img"
              height="140"
              image={course.profile_pic}
              alt={course.course_title}
            />
          )}
          <CardContent>
            <Typography variant="h5" component="div">
              {course.course_title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {course.short_description}
            </Typography>
            <Typography variant="body1" color="text.primary" gutterBottom>
              {course.long_description}
            </Typography>
            {/* <Box mt={2}>
                <PublishedAssignments courseId={courseId} />
              </Box> */}
          </CardContent>
        </>
      ) : (
        <CardContent>
          <Typography>Loading...</Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default CourseDetails;
