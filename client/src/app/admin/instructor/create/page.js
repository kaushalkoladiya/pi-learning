'use client';

import HeadingTitle from '@/components/HeadingTitle';
import { SERVER_URL } from '@/constants/routes';
import styled from '@emotion/styled';
import { Alert, Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreateInstructor = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',

    common: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ firstName, lastName, email, username, password });

    // Validate form
    const errors = {};
    if (!firstName) {
      errors.firstName = 'First name is required';
    }
    if (!lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    }
    if (!username) {
      errors.username = 'Username is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }


    // Send data to server
    try {
      fetch(`${SERVER_URL}/api/instructors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          username,
          password,
        })
      })
        .then(async response => {
          const data = await response.json();
          if (!response.ok) {
            setErrors({
              common: data
            });
          }

          // Redirect to instructor page
          return router.push('/admin/instructor');
        })
        .catch(error => console.log(error));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <HeadingTitle>
        <Typography variant="h5">Create Instructor</Typography>
      </HeadingTitle>
      <Box>
        <Form onSubmit={handleSubmit}>
          {errors.common && <Alert severity="error">{errors.common}</Alert>}

          <TextField
            fullWidth
            label="First Name"
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />

          <TextField
            fullWidth
            label="Last Name"
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />

          <TextField
            fullWidth
            label="Email"
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            label="Username"
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />

          <TextField
            fullWidth
            label="Password"
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Box>
            <Alert severity="info">
              Password must be shared with the instructor. Please note that the password is not encrypted at this stage. <b>You must note down the password and share it with the instructor.</b>
            </Alert>
          </Box>


          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </Form>
      </Box>
    </Box>
  )
}

export default CreateInstructor

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;