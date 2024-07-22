"use client";

import InstructorNavbar from '@/components/Navbar/InstructorNavbar';
import InstructorDashboard from '@/components/teacher/InstructorDashboard';
import authMiddleware from '@/utils/authRoute';
import { Box } from '@mui/material';
import React from 'react';

const Instructor = () => {
  return (
    <>
      <InstructorNavbar />
      <Box mb={10} />
      <InstructorDashboard />
    </>
  );
};

export default authMiddleware(Instructor);