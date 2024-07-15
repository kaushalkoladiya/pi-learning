"use client";

import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Typography, Paper, Link, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import styles from './StudentDashboard.module.css';
import StudentNavbar from '@/components/Navbar/StudentNavbar';
import { getStudentDashboard } from '@/api';
import authRoute from '@/utils/authRoute';
import { ROUTES } from '@/constants/routes';
import { USER_ROLES } from '@/constants/roles';
import authMiddleware from '@/utils/authRoute';

const StudentDashboard = () => {

  const [useDetails, setUseDetails] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await getStudentDashboard();
      setUseDetails(data.user);
    })();
  }, []);

  console.log('useDetails', useDetails)

  const userName = (useDetails?.first_name || "" + " " + useDetails?.last_name || "").trim();
  console.log(userName)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StudentNavbar />
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
            <Grid item xs={12} sm={6} md={6}>
              <Paper className={styles.courseCard} sx={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                <Typography variant="h6">Course Title</Typography>
                <Typography variant="body2">
                  Short Description of the course provided in the course page.
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                  Go To Course
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Paper className={styles.courseCard} sx={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                <Typography variant="h6">Course Title</Typography>
                <Typography variant="body2">
                  Short Description of the course provided in the course page.
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                  Go To Course
                </Button>
              </Paper>
            </Grid>
          </Grid>
          <div className={styles.separator}></div>
          <Typography variant="h5" className={styles.courseList}>
            Upcoming Assignments:
          </Typography>
          <TableContainer component={Paper} sx={{
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '15px',
            mt: 2,
            border: '3px solid #e0e0e0'
          }}>
            <Table sx={{ borderCollapse: 'separate', borderSpacing: '0' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Assignment Name</TableCell>
                  <TableCell>Assignment ID</TableCell>
                  <TableCell>Course Name</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Assignment 1</TableCell>
                  <TableCell>#001</TableCell>
                  <TableCell>Course 1</TableCell>
                  <TableCell><Button variant="contained" color="secondary">View</Button></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Assignment 2</TableCell>
                  <TableCell>#002</TableCell>
                  <TableCell>Course 2</TableCell>
                  <TableCell><Button variant="contained" color="secondary">View</Button></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
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