"use client";

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import '../signup/styles.css';
import axios from 'axios';

const Login = () => {
  const navigate = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Invalid email format';
    }
    if (!password) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      console.log('Token:', response.data.token);
    } catch (error) {
      console.error('Invalid credentials');
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="auth-container-wrapper">
      <div className="snow"></div>
      <Box className="auth-container">
        <Box className="auth-image">
          <img src="/images/pi.jpg" alt="Description of image" className="auth-image-content" />
        </Box>
        <Box className="auth-form-container" component={Paper} elevation={6} sx={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px' }}>
          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
            <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 2 }}>
              Sign In
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
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center" className="links">
              <Grid item>
                <Button variant="text" size="small">Forgot password?</Button>
              </Grid>
              <Grid item>
                <Button variant="text" size="small" onClick={() => navigate.push('/auth/signup')}>{"Don't have an account? Sign Up"}</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
