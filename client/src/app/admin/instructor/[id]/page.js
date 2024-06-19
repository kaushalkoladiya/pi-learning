'use client';

import { SERVER_URL } from '@/constants/routes';
import styled from '@emotion/styled';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EditInstructor = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const isViewOnly = searchParams.get('viewonly') === 'true';

  useEffect(() => {
    const fetchData = async () => { 
      const response = await fetch(`${SERVER_URL}/api/instructors/${params.id}`);
      const data = await response.json();

      console.log(response, data)

      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
      setUsername(data.username);
    };

    if (params.id) {
      fetchData();
    }
  }, []);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',

    common: '',
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

    fetch(`${SERVER_URL}/api/instructors/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
      })
    })
    .then(async response => {
      const data = await response.json();

      if (!response.ok) {
        setErrors({ common: data });
      } else {
        // Redirect to instructor page
        router.push('/admin/instructor');
      }
    });
  };

  return (
    <Box>
      <Box>
        <Typography variant="h5">{isViewOnly ? 'View' : 'Edit'} Instructor</Typography>
      </Box>

      <Box
        sx={{
          marginTop: 2
        }}
      >
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
            disabled={isViewOnly}
          />

          <TextField
            fullWidth
            label="Last Name"
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName}
            disabled={isViewOnly}
          />

          <TextField
            fullWidth
            label="Email"
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            disabled={true}
          />

          <TextField
            fullWidth
            label="Username"
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
            disabled={true}
          />

          {!isViewOnly && <Button type="submit" variant="contained" color="primary">
            Change Instructor Details
          </Button>}
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
`;