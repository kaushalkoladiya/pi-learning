'use client';

import HeadingTitle from '@/components/HeadingTitle';
import InstructorsDropdown from '@/components/InstructorsDropdown';
import { SERVER_URL } from '@/constants/routes';
import styled from '@emotion/styled';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
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

    common: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    try {
      const data = await fetch(`${SERVER_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course_name: courseName,
          course_code: shortCode,
          course_description: description,
          instructor_id: instructor,
        }),
      });

      if (data.status === 201) {
        return router.push('/admin/course');
      } else {
        const error = await data.json();
        setErrors({ common: error });
      }

      console.log('Data:', );
      console.log(data.body);

    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };


  return (
    <Box>
      <HeadingTitle>
        <Typography variant="h5">Create Course</Typography>
      </HeadingTitle>
      <Box>
        <Form onSubmit={handleSubmit}>
          {
            errors.common && (
              <Alert severity="error">{errors.common}</Alert>
            )
          }

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
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
          />

          <InstructorsDropdown selectedInstructor={instructor} onChange={setInstructor} errorMessage={errors.instructor} />

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
`;