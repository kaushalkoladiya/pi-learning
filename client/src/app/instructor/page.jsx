"use client";

import InstructorDashboard from '@/components/teacher/InstructorDashboard';
import authMiddleware from '@/utils/authRoute';
import React from 'react';

const Instructor = () => {
  return (
    <InstructorDashboard />
  );
};

export default authMiddleware(Instructor);