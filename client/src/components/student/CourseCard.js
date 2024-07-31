import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';

const CourseCard = ({ course }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Link href={`/courses/${course.course_id}`}>
          <Typography variant="h5" gutterBottom>{course.course_title}</Typography>
        </Link>
          <Typography variant="body2" color="textSecondary">{course.short_description}</Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
