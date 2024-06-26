'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';


const CreateAssignmentPage = () => {
  const router = useRouter();
  const [assignmentName, setAssignmentName] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [courseId, setCourseId] = useState('');

  const handleCreateAssignment = async () => {
    const response = await fetch('/api/assignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assignment_name: assignmentName,
        assignment_description: assignmentDescription,
        due_date: dueDate,
        course_id: parseInt(courseId, 10),
      }),
    });

    if (response.ok) {
      router.push('/admin/assignments');
    } else {
      console.error('Failed to create assignment');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Create Assignment</Typography>
      <TextField
        label="Assignment Name"
        value={assignmentName}
        onChange={(e) => setAssignmentName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Assignment Description"
        value={assignmentDescription}
        onChange={(e) => setAssignmentDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label=""
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Course ID"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleCreateAssignment}>
        Create
      </Button>
    </Box>
  );
};

export default CreateAssignmentPage;
