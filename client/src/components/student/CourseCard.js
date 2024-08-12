import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import Link from 'next/link';

const CourseCard = ({ course }) => {
  return (
    <Link href={`/courses/${course.course_id}`} passHref>
      <Card 
        variant="outlined" 
        sx={{ 
          mb: 2, 
          transition: 'transform 0.2s', 
          '&:hover': { 
            transform: 'scale(1.05)', 
            boxShadow: 3 
          } 
        }}
      >
        {course.profile_pic && (
          <CardMedia
            component="img"
            height="140"
            image={course.profile_pic}
            alt={`${course.course_title} image`}
          />
        )}
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {course.course_title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course.short_description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
