"use client";

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Divider, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import '../signup/styles.css';
import axios from 'axios';


const Login = () => {
  const navigate = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      console.log('Token:', response.data.token);
    } catch (error) {
      console.error('Invalid credentials');
    }
  };

  return (
    <div>
      <div className="snow"></div>
      <Box className="auth-container">
        <Box className="auth-image">
          <img src="./320.webp" alt="Description of image" className="auth-image-content" />
        </Box>
        <Box className="auth-form-container" component={Paper} elevation={6} sx={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px' }}>
          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
            <Typography variant="h5" component="h1" gutterBottom>
              Sign in
            </Typography>
            <Grid container spacing={2} justifyContent="space-between" className="btn-group">
              <Grid item xs={12} sm={6}>
                
              </Grid>
              <Grid item xs={12} sm={6}>
                
              </Grid>
            </Grid>
            
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container className="links">
              <Grid item>
                <Button variant="text" size="small">Forgot password?</Button>
              </Grid>
              <Grid item>
                <Button variant="text" size="small" onClick={() => navigate.push('/signup')}>{"Don't have an account? Sign Up"}</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
