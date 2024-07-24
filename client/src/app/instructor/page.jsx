"use client";

import Navbar from '@/components/Navbar';
import InstructorDashboard from '@/components/teacher/InstructorDashboard';
import authMiddleware from '@/utils/authRoute';
import { Box } from '@mui/material';
import React from 'react';

const Instructor = () => {
  return (
    <>
      <Navbar />
      <Box mb={10} />
      <InstructorDashboard />
    </>
  );
};

export default authMiddleware(Instructor);