"use client";

import React from 'react';
import { Box, Container, Typography, Link, AppBar, Toolbar, Button } from '@mui/material';
import Image from 'next/image';
import './styles.css';

const StudentLanding = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="logo">
            Student Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <nav>
            <Button color="inherit" href="#">Courses</Button>
            <Button color="inherit" href="#">Assignments</Button>
            <Button color="inherit" href="#">Profile</Button>
            <Button color="inherit" href="#">Logout</Button>
          </nav>
        </Toolbar>
      </AppBar>
      <Box className="hero">
        <Image src="/images/hero-image.jpg" alt="Hero" width={700} height={400} />
      </Box>
      <Container className="container">
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Student Portal
        </Typography>
        <Typography variant="body1" paragraph>
          View your courses, submit assignments, and update your profile.
        </Typography>
      </Container>
      <footer>
        <Typography variant="body2">© 2024 Your Company</Typography>
      </footer>
    </>
  );
};

export default StudentLanding;
