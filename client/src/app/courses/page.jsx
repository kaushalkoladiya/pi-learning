'use client';

import { getStudentCourses } from '@/api';
import BackButton from '@/components/BackButton';
import CourseCard from '@/components/CourseCard';
import { Box, Grid, IconButton, styled } from '@mui/material'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const StudentCourseList = () => {
  const router = useRouter();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    getStudentCourses().then((response) => {
      setCourseList(response?.data || []);
    }).catch((error) => {
      console.error('Error fetching courses:', error);
    });
  }, [])

  return (
    <Box>
      <BackButton />
      <HeroImage src='/images/courses-hero.jpg' alt='courses-hero' />
      <Grid container spacing={2}>
        {courseList.map((course) => (
          <Grid item md={3} sm={6} sx={12}>
            <CourseCard key={course.id} course={course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default StudentCourseList

const HeroImage = styled('img')({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  marginBottom: '1rem'
});
