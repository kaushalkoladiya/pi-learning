"use client";
import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { SERVER_URL } from "@/constants/routes";
import axios from 'axios';
import authMiddleware from '@/utils/authRoute';
import AdminWrapper from '@/components/AdminWrapper';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    instructors: 0,
    programs: 0,
    courses: 0,
    lessons: 0,
    assignments: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/counts`);
        {console.log(response.data)}
        setCounts(response.data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <AdminWrapper>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
        <Typography variant="subtitle1" gutterBottom>Welcome, Admin!</Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {[
            { title: 'Total Instructors', count: counts.instructors, link: '/admin/instructor' },
            { title: 'Total Programs', count: counts.programs, link: '/admin/program' },
            { title: 'Total Courses', count: counts.courses, link: '/admin/course' },
            { title: 'Total Lessons', count: counts.lessons, link: '/admin/lesson' },
            { title: 'Total Assignments', count: counts.assignments, link: '/admin/assignment' },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="h5">{item.count}</Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }} href={item.link}>
                    View and Manage
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </AdminWrapper>
  );
};

export default authMiddleware(AdminDashboard);






