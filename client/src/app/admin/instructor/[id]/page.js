'use client';

import styled from '@emotion/styled';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const EditInstructor = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ firstName, lastName, email, username });

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
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }


    // Send data to server
    try {

      // Redirect to instructor page
      router.push('/admin/instructor');
    } catch (error) {
      console.log(error);
    }

    // Clear form
    setFirstName('');
    setLastName('');
    setEmail('');
    setUsername('');
  };

  return (
    <Box>
      <Box>
        <Typography variant="h5">Edit Instructor</Typography>
      </Box>
      <Box>
        <Form onSubmit={handleSubmit}>
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

          <Button type="submit" variant="contained" color="primary">
            Change Instructor Details
          </Button>
        </Form>
      </Box>
    </Box>
  )
}

export default EditInstructor

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
`;