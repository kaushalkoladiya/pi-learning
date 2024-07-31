'use client';

import { fetchCourseDetails, fetchCourseLessons, checkEnrollment, enrollInCourse } from '@/api';
import { Box, Button, Card, CardContent, CircularProgress, Container, Grid, List, ListItem, ListItemText, Typography, Paper, Avatar } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import BackButton from '@/components/BackButton';
import useAuth from '@/hooks/useAuth';

const CourseDetails = () => {
  const { isAuth } = useAuth();
  const params = useParams();
  const router = useRouter();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const courseId = params.id;
      if (!courseId) {
        return;
      }

      try {
        const { data: courseData } = await fetchCourseDetails(courseId);
        const { data: lessonData } = await fetchCourseLessons(courseId);
        setCourse(courseData);
        setLessons(lessonData);

        if (isAuth) {
          const { data: enrollmentStatus } = await checkEnrollment(courseId);
          setIsEnrolled(enrollmentStatus?.isEnrolled);
        }

        setLoading(false);
      } catch (error) {
        console.log('Error fetching course details:', error);
        setError('Error fetching course details. Please try again later.');
        setLoading(false);
      }
    })();
  }, [params.id, isAuth]);

  const handleEnroll = async () => {
    if (!isAuth) {
      router.push('/login');
    } else {
      try {
        await enrollInCourse(params.id);
        setIsEnrolled(true);
      } catch (error) {
        console.error('Error enrolling in course:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  if (!course) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Course not found</Typography>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <BackButton />
      <Container>
        <Paper elevation={3}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                {course.profile_pic && (
                  <Avatar 
                    alt={`${course.course_title} profile`} 
                    src={course.profile_pic} 
                    variant="square" 
                    sx={{ width: '100%', height: 'auto' }}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h4" component="div" gutterBottom>
                  {course.course_title}
                </Typography>
                <Typography variant="body1" color="text.primary" gutterBottom>
                  {course.long_description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEnroll}
                  disabled={isEnrolled}
                  sx={{ mt: 2 }}
                >
                  {isEnrolled ? 'Enrolled' : 'Enroll in this course'}
                </Button>
              </Grid>
            </Grid>
            <Typography variant="h5" component="div" gutterBottom mt={3}>
              Lessons
            </Typography>
            <List>
              {lessons.map((lesson) => (
                <ListItem key={lesson.lesson_id} divider>
                  <ListItemText
                    primary={lesson.lesson_name}
                    secondary={lesson.lesson_description}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Paper>
      </Container>
    </Box>
  );
};

export default CourseDetails;
