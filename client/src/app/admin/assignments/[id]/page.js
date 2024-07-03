'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import { SERVER_URL } from '@/constants/routes';
import CoursesDropdown from '@/components/CourseDropdown';

const EditAssignmentPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [assignmentName, setAssignmentName] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [courseId, setCourseId] = useState('');
  const [errors, setErrors] = useState({
    assignmentName: '',
    assignmentDescription: '',
    dueDate: '',
    courseId: '',
  });

  useEffect(() => {
    fetch(`${SERVER_URL}/api/assignments/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAssignment(data);
        setAssignmentName(data.assignment_name);
        setAssignmentDescription(data.assignment_description);
        setDueDate(data.due_date);
        setCourseId(data.course_id);
      })
      .catch((error) => console.error('Error fetching assignment:', error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = {};
    if (!assignmentName.trim()) {
      errors.assignmentName = 'Assignment name is required';
    }
    if (!assignmentDescription.trim()) {
      errors.assignmentDescription = 'Assignment description is required';
    }
    if (!dueDate.trim()) {
      errors.dueDate = 'Due date is required';
    }
    if (!courseId) {
      errors.courseId = 'Course ID is required';
    }
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    // updated assignment data
    const updatedAssignment = {
      assignment_name: assignmentName,
      assignment_description: assignmentDescription,
      due_date: dueDate,
      course_id: parseInt(courseId, 10),
    };

    try {
      // try sending updated data to the server
      const response = await fetch(`${SERVER_URL}/api/assignments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAssignment),
      });

      if (response.ok) {
        router.push('/admin/assignments'); // redirect after successful hit
      } else {
        console.error('Failed to update assignment');
      }
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  };

  // render form if assignment data is loaded
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Edit Assignment</Typography>
      {assignment ? (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Assignment Name"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
            error={!!errors.assignmentName}
            helperText={errors.assignmentName}
          />
          <TextField
            fullWidth
            label="Assignment Description"
            value={assignmentDescription}
            onChange={(e) => setAssignmentDescription(e.target.value)}
            error={!!errors.assignmentDescription}
            helperText={errors.assignmentDescription}
          />
          <TextField
            fullWidth
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            error={!!errors.dueDate}
            helperText={errors.dueDate}
          />

          <CoursesDropdown
            errorMessage={errors.courseId}
            selectedCourse={courseId}
            onChange={setCourseId}
          />

          <Button type="submit" variant="contained" color="primary">
            Update Assignment
          </Button>
        </form>
      ) : (
        <Typography>Loading...</Typography> /* Loading untill fetched successfully */
      )}
    </Box>
  );
};

export default EditAssignmentPage;
