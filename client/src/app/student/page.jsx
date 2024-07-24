"use client";

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Link,
  Avatar
} from '@mui/material';
import styles from './StudentDashboard.module.css';
import { getStudentDashboard } from '@/api';
import authMiddleware from '@/utils/authRoute';
import { useRouter } from 'next/navigation';
import StudentAssignmentSection from '@/components/StudentAssignmentSection';
import Navbar from '@/components/Navbar';

const StudentDashboard = () => {
  const router = useRouter();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [useDetails, setUseDetails] = useState(null);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getStudentDashboard();
      setUseDetails(data.user);
      setEnrolledCourses(data.enrolledCourses || []);
      setAssignments(data.assignments || []);
    })();
  }, []);

  const handleGoToCourse = (courseId) => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box mt={10} className={styles.hero}>
        <Box className={styles.heroText}>
          <Typography variant="h4">{(useDetails?.first_name || '' + " " + useDetails?.last_name || '').trim() || 'Unknown'}</Typography>
          <Typography variant="body1">#{useDetails?.id || ''}</Typography>
          <Avatar src="/profile-pic-placeholder.png" alt="Profile" className={styles.avatar}>
          </Avatar>
        </Box>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container sx={{ width: '100%', maxWidth: '100%' }}>
          <Typography variant="h5" className={styles.courseList}>
            Course List:
          </Typography>
          <Grid container spacing={3} className={styles.courseList}>
            {enrolledCourses.map((enrollment) => (
              <Grid item xs={12} sm={6} md={6} key={enrollment.id}>
                <Paper className={styles.courseCard} sx={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                  <Typography variant="h6">{enrollment.Course.course_name}</Typography>
                  <Typography variant="body2">
                    {enrollment.Course.course_description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                    onClick={() => handleGoToCourse(enrollment.course_id)}
                  >
                    Go To Course
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <div className={styles.separator}></div>
          <StudentAssignmentSection assignments={assignments} />
        </Container>
      </Box>
      <Box className={styles.footer}>
        <Typography variant="body2">Powered by Pi-learning</Typography>
        <Link href="#" color="inherit">Home</Link> | <Link href="#" color="inherit">Courses</Link> | <Link href="#" color="inherit">About Us</Link> | <Link href="#" color="inherit">Contact us</Link> | <Link href="#" color="inherit">Instructor Dashboard</Link> | <Link href="#" color="inherit">Student Dashboard</Link>
      </Box>
    </Box>
  );
};

export default authMiddleware(StudentDashboard);