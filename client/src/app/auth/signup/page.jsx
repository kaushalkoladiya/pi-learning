"use client";

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';
import './styles.css';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!firstName) {
      errors.firstName = 'First name is required';
    } else if (!validateName(firstName)) {
      errors.firstName = 'First name cannot contain numbers';
    }
    if (!lastName) {
      errors.lastName = 'Last name is required';
    } else if (!validateName(lastName)) {
      errors.lastName = 'Last name cannot contain numbers';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Invalid email format';
    }
    if (!newPassword) {
      errors.newPassword = 'Password is required';
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    
    try {
      await axios.post('http://localhost:5000/register', { firstName, lastName, email, password: newPassword });
      console.log('User registered');
      router.push('/login');
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
          <img src="/images/pi.jpg" alt="Description of " className="auth-image-content" />
        </Box>
        <Box className="auth-form-container" component={Paper} elevation={6} sx={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <Box component="form" onSubmit={handleSignup} sx={{ width: '100%' }}>
            <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 2 }}>
              Sign Up
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
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!fieldErrors.firstName}
              helperText={fieldErrors.firstName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!fieldErrors.lastName}
              helperText={fieldErrors.lastName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
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
              error={!!fieldErrors.newPassword}
              helperText={fieldErrors.newPassword}
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
              error={!!fieldErrors.confirmPassword}
              helperText={fieldErrors.confirmPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Button variant="text" size="small" onClick={() => router.push('/auth/login')}>{"Already have an account? Sign In"}</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Signup;
