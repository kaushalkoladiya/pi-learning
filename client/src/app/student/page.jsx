'use client';

import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, CircularProgress, Button, Container } from '@mui/material';
import { fetchStudentDashboardData } from '@/api';
import { useRouter } from 'next/navigation';
import CourseCard from '@/components/student/CourseCard';
import StudentAssignmentSection from '@/components/student/StudentAssignmentSection';
import Navbar from '@/components/Navbar';
import CourseCompletionCertificates from '@/components/student/CourseCompletionCertificates';

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
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="body1" mt={2}>Loading your dashboard...</Typography>
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" gutterBottom>Failed to load dashboard data</Typography>
        <Button variant="contained" onClick={() => router.reload()}>Retry</Button>
      </Box>
    );
  }

  return (
    <Container>
      <Navbar />
      <Box my={6} />
      <Box p={4}>
        <Typography variant="h5" gutterBottom>
          Welcome, {dashboardData?.user?.first_name} {dashboardData?.user?.last_name}
        </Typography>

        <Typography variant="h6" gutterBottom mt={4}>Overview</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <StudentAssignmentSection assignments={dashboardData.assignments} />
          </Grid>
          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Recent Courses</Typography>
                <Grid container spacing={2} mt={2}>
                  {dashboardData.enrolledCourses.map(enrollment => (
                    <Grid key={enrollment.course_id} item xs={6} md={4}>
                      <CourseCard course={enrollment.Course} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <CourseCompletionCertificates user={dashboardData.user} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default StudentDashboard;
