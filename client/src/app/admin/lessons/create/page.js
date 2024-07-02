'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const CreateLessonPage = () => {
  const router = useRouter();
  const [lessonName, setLessonName] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [courseId, setCourseId] = useState('');

  const handleCreateLesson = async () => {
    const response = await fetch('/api/lessons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lesson_name: lessonName,
        lesson_description: lessonDescription,
        lesson_content: lessonContent,
        course_id: parseInt(courseId, 10),
      }),
    });

    if (response.ok) {
      router.push('/admin/lessons');
    } else {
      console.error('Failed to create lesson');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Create Lesson</Typography>
      <TextField
        label="Lesson Name"
        value={lessonName}
        onChange={(e) => setLessonName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Lesson Description"
        value={lessonDescription}
        onChange={(e) => setLessonDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Lesson Content"
        value={lessonContent}
        onChange={(e) => setLessonContent(e.target.value)}
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
      <Button variant="contained" color="primary" onClick={handleCreateLesson}>
        Create
      </Button>
    </Box>
  );
};

export default CreateLessonPage;
