"use client";

import React from 'react';
import { Box, Button, Container, Grid, Typography, Paper, Link, Avatar, Toolbar } from '@mui/material';
import styles from './InstructorDashboard.module.css';
import InstructorNavbar from '@/components/Navbar/InstructorNavbar';

const InstructorDashboard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <InstructorNavbar />
      <Box mt={10} className={styles.hero}>
        <Box className={styles.heroText}>
          <Typography variant="h4">Instructor Name</Typography>
          <Typography variant="body1">🌐 Language</Typography>
          <Avatar src="/profile-pic-placeholder.png" alt="Profile" className={styles.avatar} />
        </Box>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container sx={{ width: '100%', maxWidth: '100%' }}>
          <Box className={styles.statContainer}>
            <Grid container spacing={4} className={styles.statGrid}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper className={styles.statCard} sx={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                  <Typography variant="h6">3</Typography>
                  <Typography variant="body2">Total Courses Assigned</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper className={styles.statCard} sx={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                  <Typography variant="h6">30</Typography>
                  <Typography variant="body2">Total Students Assigned</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper className={styles.statCard} sx={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                  <Typography variant="h6">50</Typography>
                  <Typography variant="body2">Total Lectures</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper className={styles.statCard} sx={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                  <Typography variant="h6">13</Typography>
                  <Typography variant="body2">Students Graded</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper className={styles.statCard} sx={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                  <Typography variant="h6">17</Typography>
                  <Typography variant="body2">Students Ungraded</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper className={styles.statCard} sx={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                  <Typography variant="h6">0</Typography>
                  <Typography variant="body2">Students Passed</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
          <div className={styles.separator}></div>
          <Typography variant="h5" className={styles.courseList}>
            Course List:
          </Typography>
          <Grid container spacing={3} className={styles.courseList}>
            <Grid item xs={12} sm={6} md={6}>
              <Paper className={styles.courseCard} sx={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                <Typography variant="h6">Course Title</Typography>
                <Typography variant="body2">
                  Short Description of the course provided in the course page.
                  <br />
                  Students in this course: 15
                  <br />
                  Lectures in this course: 25
                  <br />
                  Assignments in this course: 12
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                  Go To Course Options
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Paper className={styles.courseCard} sx={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                <Typography variant="h6">Course Title</Typography>
                <Typography variant="body2">
                  Short Description of the course provided in the course page.
                  <br />
                  Students in this course: 15
                  <br />
                  Lectures in this course: 25
                  <br />
                  Assignments in this course: 5
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                  Go To Course Options
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className={styles.footer}>
        <Typography variant="body2">Powered by Pi-learning</Typography>
        <Link href="#" color="inherit">Home</Link> | <Link href="#" color="inherit">Courses</Link> | <Link href="#" color="inherit">About Us</Link> | <Link href="#" color="inherit">Contact us</Link> | <Link href="#" color="inherit">Instructor Dashboard</Link> | <Link href="#" color="inherit">Student Dashboard</Link>
      </Box>
    </Box>
  );
};

export default InstructorDashboard;