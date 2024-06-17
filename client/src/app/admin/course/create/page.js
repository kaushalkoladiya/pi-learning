'use client';

import styled from '@emotion/styled';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreateCourse = () => {
  const router = useRouter();

  const [courseName, setCourseName] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');

  const [errors, setErrors] = useState({
    courseName: '',
    shortCode: '',
    description: '',
    instructor: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ courseName, shortCode, description, instructor });

    // Validate form
    const errors = {};
    if (!courseName) {
      errors.courseName = 'Course name is required';
    }
    if (!shortCode) {
      errors.shortCode = 'Short code is required';
    }
    if (!description) {
      errors.description = 'Description is required';
    }
    if (!instructor) {
      errors.instructor = 'Instructor is required';
    }
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }


    // Send data to server

    // Redirect to course page
    router.push('/admin/course');
  };


  return (
    <Box>
      <Box>
        <Typography variant="h5">Create Course</Typography>
      </Box>
      <Box>
        <Form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Course Name"
            type='text'
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            error={!!errors.courseName}
            helperText={errors.courseName}
          />

          <TextField
            fullWidth
            label="Short Code"
            type='text'
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            error={!!errors.shortCode}
            helperText={errors.shortCode}
          />

          <TextField
            fullWidth
            label="Description"
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
          />

          <FormControl fullWidth>
            <InputLabel id="instructor">Instructor</InputLabel>
            <Select
              labelId="instructor"
              value={instructor}
              label="Instructor"
              onChange={(e) => setInstructor(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </Form>
      </Box>
    </Box>
  )
}

export default CreateCourse

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
`;