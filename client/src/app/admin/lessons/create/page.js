'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import CoursesDropdown from '@/components/CourseDropdown';
import { SERVER_URL } from '@/constants/routes';

const CreateLessonPage = () => {
  const router = useRouter();
  const [lessonName, setLessonName] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [courseId, setCourseId] = useState('');

  const [errors, setErrors] = useState({
    lessonName: '',
    lessonDescription: '',
    lessonContent: '',
    courseId: '',

    common: '',
  });


  const handleCreateLesson = async (e) => {
    e.preventDefault();
    // Validate form
    const errors = {};

    if (!lessonName) {
      errors.lessonName = 'Lesson name is required';
    }

    if (!lessonDescription) {
      errors.lessonDescription = 'Lesson description is required';
    }

    if (!lessonContent) {
      errors.lessonContent = 'Lesson content is required';
    }

    if (!courseId) {
      errors.courseId = 'Course ID is required';
    }

    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const response = await fetch(`${SERVER_URL}/api/lessons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lesson_name: lessonName,
        lesson_description: lessonDescription,
        lesson_content: lessonContent,
        course_id: courseId,
      }),
    });

    console.log('Response:', response);

    if (response.ok) {
      router.push('/admin/lessons');
    } else {
      const data = await response.json();
      setErrors({ common: data.message });
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Create Lesson</Typography>

      <form onSubmit={handleCreateLesson}>

        {errors.common && (
          <Alert severity="error">
            {errors.common}
          </Alert>
        )}

        <br/>

        <TextField
          label="Lesson Name"
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
          fullWidth

          error={!!errors.lessonName}
          helperText={errors.lessonName}
        />
        <TextField
          label="Lesson Description"
          value={lessonDescription}
          onChange={(e) => setLessonDescription(e.target.value)}
          fullWidth

          error={!!errors.lessonDescription}
          helperText={errors.lessonDescription}
        />
        <TextField
          label="Lesson Content"
          value={lessonContent}
          onChange={(e) => setLessonContent(e.target.value)}
          fullWidth
          multiline
          rows={10}
          error={!!errors.lessonContent}
          helperText={errors.lessonContent}
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

export default CreateLessonPage;
