"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import { Box, Typography, Toolbar } from '@mui/material';
import useAuth from '@/hooks/useAuth';

const AdminDashboard = () => {
  const { isUserAdmin, isAuth } = useAuth();

  if (!isAuth) {
    return <Typography>You need to be logged in to access this page.</Typography>;
  }

  if (!isUserAdmin()) {
    return <Typography>You do not have access to this page.</Typography>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4">Admin Dashboard</Typography>
        <Typography>Welcome, Admin!</Typography>
      </Box>
    </Box>
  );
};

export default AdminDashboard;



