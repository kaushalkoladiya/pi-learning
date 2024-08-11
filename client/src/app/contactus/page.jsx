"use client";

import React from 'react';
import NextLink from 'next/link';
import { AppBar, Box, Button, Container, Grid, Typography, Paper, Link, Toolbar, TextField } from '@mui/material';
import styles from './contactus.module.css';

const ContactUs = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#2e2e2e', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
            <Typography variant="h6" noWrap>
              Pi Learning
            </Typography>
            <Box display="flex" alignItems="center">
              <Button color="inherit" href="/">Home</Button>
              <Button color="inherit" href="/auth/login">Login</Button>
              <Button color="inherit" href="/auth/signup">Sign up</Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box className={styles.hero}>
        <Typography variant="h4">Contact us</Typography>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container sx={{ width: '100%', maxWidth: '100%' }}>
          <Typography variant="body1" gutterBottom>
            We’re here to help! At Pi-Learning, we value your feedback, questions, and suggestions. Whether you need assistance with our platform, have inquiries about our courses, or simply want to share your thoughts, we are always ready to listen and assist.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Get In Touch
          </Typography>
          <Typography variant="body2">
            Our customer support team is dedicated to providing you with the best possible service. If you have any questions or need help with our platform, please don’t hesitate to contact us.
          </Typography>
          <Typography variant="body2" gutterBottom>
            Email: support@pi-learning.com<br />
            Phone: +1 (800) 123-4567
          </Typography>
          <Typography variant="body2">
            Your feedback is important to us. Please fill out our feedback form to let us know how we can improve our services.
          </Typography>
          <Paper className={styles.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Name" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email ID" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Type your message here" variant="outlined" multiline rows={4} />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button variant="contained" color="secondary">Submit</Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
      <Box className={styles.footer}>
        <Typography variant="body2">Powered by Pi-learning</Typography>
        <Link href="/" color="inherit">Home</Link> | <Link href="/Coursepublic" color="inherit">Courses</Link> | <Link href="/about" color="inherit">About Us</Link> | <Link href="/contactus" color="inherit">Contact us</Link> | <Link href="/auth/Instructor_dashboard" color="inherit">Instructor Dashboard</Link> | <Link href="/auth/student_dashboard" color="inherit">Student Dashboard</Link>
      </Box>
    </Box>
  );
};

export default ContactUs;
