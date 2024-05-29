"use client";

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';
import './styles.css';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:5000/register', { email, password: newPassword, phone: phoneNumber });
      console.log('User registered');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed');
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container-wrapper">
      <div className="snow"></div>
      <Box className="auth-container">
        <Box className="auth-image">
          <img src="client\frontend\images\kali.jpg" alt="Description of " className="auth-image-content" />
        </Box>
        <Box className="auth-form-container" component={Paper} elevation={6} sx={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px' }}>
          <Box component="form" onSubmit={handleSignup} sx={{ width: '100%' }}>
            <Typography variant="h5" component="h1" gutterBottom align="center">
              Sign up
            </Typography>
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              type="tel"
              id="phoneNumber"
              autoComplete="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Button variant="text" size="small" onClick={() => router.push('/about')}>{"Already have an account? Sign In"}</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Signup;
