'use client';

import React, { useEffect, useState } from 'react';
import { fetchCourseDetails, fetchCourseLessons, checkEnrollment, enrollInCourse } from '@/api';
import { Box, Button, CardContent, CircularProgress, Container, Grid, List, ListItem, ListItemText, Typography, Paper, Avatar, Alert, Modal } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';
import useAuth from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import emailjs from '@emailjs/browser';
import swal from 'sweetalert';

const CourseDetails = () => {
  const { isAuth, ...rest } = useAuth();
  const params = useParams();
  const router = useRouter();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [error, setError] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(rest)

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

        swal('Success', 'You have successfully enrolled in this course', 'success');

        const firstName = localStorage.getItem('firstName') || '';

        // Send email to user
        emailjs.send(
          process.env.NEXT_EMAILJS_SERVICE_ID,
          process.env.NEXT_EMAILJS_TEMPLATE_ID,
          {
            message: `You have successfully enrolled in course : ${course.course_title}`,
            to_name: firstName || 'Learner',
            from_name: 'Course Enroll'
          },
          {
            publicKey: process.env.NEXT_EMAILJS_PUBLIC_KEY,
          },
        );
      } catch (error) {
        console.error('Error enrolling in course:', error);
      }
    }
  };

  const handleOpenQuizModal = async () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    <Box>
      <Navbar />
      <Box my={6} />
      <Box p={6}>
        <BackButton />
        <Container>
          <Alert severity="success" >
            Explore our AI module!{' '}
            <Button color="inherit" variant='contained' onClick={handleOpenQuizModal}>
              Click here to start
            </Button>
          </Alert>
          <Paper elevation={3}>

            <Box my={4} />

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

                    {isAuth && lesson.lesson_files && lesson.lesson_files.length > 0 && (
                      <List>
                        {lesson.lesson_files.map((file) => (
                          <ListItem key={file.file_id}>
                            <ListItemText
                              primary={file.file_name}
                              secondary={
                                <Button
                                  variant="contained"
                                  color="primary"
                                  href={file.file_url}
                                  target="_blank"
                                >
                                  Download
                                </Button>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}

                    {!isAuth && (
                      <Typography variant="body2" color="text.secondary">
                        Login to download lesson files
                      </Typography>
                    )}

                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Paper>
        </Container>
      </Box>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{
          p: 4,
          backgroundColor: 'white',
          margin: 'auto',
          maxWidth: '80%',
          borderRadius: 2,
          mt: 8,
          minHeight: '80vh',
        }}>
          <iframe
            src={process.env.NEXT_AI_SERVER_URL}
            title="AI Module Quiz"
            width="100%"
            height="700px"
            style={{ border: 'none' }}
          />
          <Button
            variant="contained"
            onClick={handleCloseModal}
            sx={{ mt: 2, display: 'block', marginLeft: 'auto' }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CourseDetails;
