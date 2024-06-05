"use client";

import React from 'react';
import { Box, Container, Typography, Link, AppBar, Toolbar, Button } from '@mui/material';
import Image from 'next/image';
import './styles.css';

const AdminLanding = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="logo">
            Admin Panel
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <nav>
            <Button color="inherit" href="#">Dashboard</Button>
            <Button color="inherit" href="#">Users</Button>
            <Button color="inherit" href="#">Settings</Button>
            <Button color="inherit" href="#">Logout</Button>
          </nav>
        </Toolbar>
      </AppBar>
      <Box className="hero">
        <Image src="/images/hero-image.jpg" alt="Hero" width={700} height={400} />
      </Box>
      <Container className="container">
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Admin Panel
        </Typography>
        <Typography variant="body1" paragraph>
          Manage your users, view statistics, and configure settings.
        </Typography>
      </Container>
      <footer>
        <Typography variant="body2">© 2024 Your Company</Typography>
      </footer>
    </>
  );
};

export default AdminLanding;
