'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import CoursesDropdown from '@/components/CourseDropdown';
import { SERVER_URL } from '@/constants/routes';


const CreateAssignmentPage = () => {
  const router = useRouter();
  const [assignmentName, setAssignmentName] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [courseId, setCourseId] = useState('');

  const [errors, setErrors] = useState({
    assignmentName: '',
    assignmentDescription: '',
    dueDate: '',
    courseId: '',

    common: '',
  });


  const handleCreateAssignment = async (e) => {
    e.preventDefault();

    let errors = {};

    if (!assignmentName) {
      errors.assignmentName = 'Assignment name is required';
    }

    if (!assignmentDescription) {
      errors.assignmentDescription = 'Assignment description is required';
    }

    if (!dueDate) {
      errors.dueDate = 'Due date is required';
    }

    if (!courseId) {
      errors.courseId = 'Course ID is required';
    }

    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return
    }

    fetch(`${SERVER_URL}/api/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assignment_name: assignmentName,
        assignment_description: assignmentDescription,
        due_date: dueDate,
        course_id: courseId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json();
        }
        
        router.push('/admin/assignments');
      })
      .then((data) => {
        setErrors({
          common: data,
        });
      })
      .catch((error) => {
        console.error('Error creating assignment:', error);
      });

  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Create Assignment</Typography>

      <form onSubmit={handleCreateAssignment}>
        {
          errors.common && <Alert severity="error">{errors.common}</Alert>
        }

        <br/>

        <TextField
          label="Assignment Name"
          value={assignmentName}
          onChange={(e) => setAssignmentName(e.target.value)}
          fullWidth
          error={!!errors.assignmentName}
          helperText={errors.assignmentName}
        />
        <TextField
          label="Assignment Description"
          value={assignmentDescription}
          onChange={(e) => setAssignmentDescription(e.target.value)}
          fullWidth
          error={!!errors.assignmentDescription}
          helperText={errors.assignmentDescription}
        />
        <TextField
          label=""
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
          error={!!errors.dueDate}
          helperText={errors.dueDate}
        />

        <CoursesDropdown
          errorMessage={errors.courseId}
          selectedCourse={courseId}
          onChange={setCourseId}
        />

        <Button variant="contained" color="primary" type='submit'>
          Create
        </Button>
      </form>
    </Box>
  );
};

export default CreateAssignmentPage;
