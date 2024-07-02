'use client';

import InstructorsDropdown from '@/components/InstructorsDropdown';
import { SERVER_URL } from '@/constants/routes';
import styled from '@emotion/styled';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EditCourse = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const isViewOnly = searchParams.get('viewonly') === 'true';

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

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/courses/${params.id}`);
        const data = await response.json();

        setCourseName(data.course_name);
        setShortCode(data.course_code);
        setDescription(data.course_description);
        setInstructor(data.instructor_id);
      } catch (error) {
        console.log(error)
      }
    };

    if (params.id) {
      fetchCourse();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isViewOnly) {
      return;
    }

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
      const response = await fetch(`${SERVER_URL}/courses/${params.id}`, {
        method: 'PUT',
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

      router.push('/admin/course');
    } catch (error) {
      console.log(error)
    }

    // Redirect to course page
    router.push('/admin/lesson');
  };

  return (
    <Box>
      <Box>
        <Typography variant="h5">{isViewOnly ? 'View' : 'Edit'} Instructor</Typography>
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
            disabled={isViewOnly}
          />

          <TextField
            fullWidth
            label="Short Code"
            type='text'
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            error={!!errors.shortCode}
            helperText={errors.shortCode}
            disabled={isViewOnly}
          />

          <TextField
            fullWidth
            label="Description"
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
            disabled={isViewOnly}
            multiline
            rows={4}
          />

          <InstructorsDropdown selectedInstructor={instructor} onChange={setInstructor} />

          {!isViewOnly && <Button type="submit" variant="contained" color="primary">
            Edit
          </Button>}
        </Form>
      </Box>
    </Box>
  )
}

export default EditCourse

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
`;