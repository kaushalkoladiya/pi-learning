"use client";
import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';
import useAuth from '@/hooks/useAuth';
import authMiddleware from '@/utils/authRoute';

const AdminDashboard = () => {

  const { isUserAdmin, isAuth } = useAuth();

  if (!isAuth) {
    return <Typography>You need to be logged in to access this page.</Typography>;
  }

  if (!isUserAdmin()) {
    return <Typography>You do not have access to this page.</Typography>;
  }

  return (
    <AdminWrapper>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <Typography variant="h4">Admin Dashboard</Typography>
          <Typography>Welcome, Admin!</Typography>
        </Box>
      </Box>
    </AdminWrapper>
  );
};

export default authMiddleware(AdminDashboard);






