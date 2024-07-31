'use client';

import { getStudentCourses } from '@/api';
import BackButton from '@/components/BackButton';
import CourseCard from '@/components/CourseCard';
import { Box, Grid, styled, Typography, Container, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';

const StudentCourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentCourses().then((response) => {
      setCourseList(response?.data || []);
      setLoading(false);
    }).catch((error) => {
      console.error('Error fetching courses:', error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box position={'relative'}>
      <BackButton />
      <HeroImage src='/images/courses-hero.jpg' alt='courses-hero' />
      <Container>
        {courseList.length > 0 && (
          <>
            <Typography variant="h4" gutterBottom>
              Most Recent Course
            </Typography>
            <CourseCard course={courseList[0]} isHero />
          </>
        )}
        <Grid container spacing={4} mt={4}>
          {courseList.slice(1).map((course) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={course.course_id}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StudentCourseList;

const HeroImage = styled('img')({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  marginBottom: '1rem',
  opacity: 0.8,
});
