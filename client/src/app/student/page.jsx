'use client';

import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, CircularProgress, Button, Container } from '@mui/material';
import { fetchStudentDashboardData } from '@/api';
import { useRouter } from 'next/navigation';
import AssignmentCard from '@/components/student/AssignmentCard';
import CourseCard from '@/components/student/CourseCard';

const StudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchStudentDashboardData();
        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Failed to load dashboard data</Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Box p={4}>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Courses</Typography>
                <Button variant="contained" color="primary" fullWidth onClick={() => router.push('/courses')}>View Courses</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Assignments</Typography>
                <Button variant="contained" color="primary" fullWidth onClick={() => router.push('/student/assignments')}>View Assignments</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Grades</Typography>
                <Button variant="contained" color="primary" fullWidth onClick={() => router.push('/grades')}>View Grades</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Certificates</Typography>
                <Button variant="contained" color="primary" fullWidth onClick={() => router.push('/certificates')}>View Certificates</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom mt={4}>Overview</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Recent Courses</Typography>
                {dashboardData.enrolledCourses.slice(0, 3).map(enrollment => (
                  <CourseCard key={enrollment.course_id} course={enrollment.Course} />
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Recent Assignments</Typography>
                {dashboardData.assignments.slice(0, 3).map(assignment => (
                  <AssignmentCard key={assignment.assignment_id} assignment={assignment} />
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default StudentDashboard;
