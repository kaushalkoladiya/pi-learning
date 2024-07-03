'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import { SERVER_URL } from '@/constants/routes';

const EditLessonPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [lessonName, setLessonName] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [errors, setErrors] = useState({
    lessonName: '',
    lessonDescription: '',
    lessonContent: '',
  });

  useEffect(() => {
    fetch(`${SERVER_URL}/api/lessons/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLesson(data);
        setLessonName(data.lesson_name);
        setLessonDescription(data.lesson_description);
        setLessonContent(data.lesson_content);
      })
      .catch((error) => console.error('Error fetching lesson:', error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate form
    const errors = {};
    if (!lessonName.trim()) {
      errors.lessonName = 'Lesson name is required';
    }
    if (!lessonDescription.trim()) {
      errors.lessonDescription = 'Lesson description is required';
    }
    if (!lessonContent.trim()) {
      errors.lessonContent = 'Lesson content is required';
    }
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    
    const updatedLesson = {
      lesson_name: lessonName,
      lesson_description: lessonDescription,
      lesson_content: lessonContent,
    };

    try {
      // try sending updated data to the server
      const response = await fetch(`${SERVER_URL}/api/lessons/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLesson),
      });

      if (response.ok) {
        router.push('/admin/lessons'); // redirect list after successful update
      } else {
        console.error('Failed to update lesson');
      }
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  };

  // render form if lesson data is loaded
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Edit Lesson</Typography>
      {lesson ? (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Lesson Name"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            error={!!errors.lessonName}
            helperText={errors.lessonName}
          />
          <TextField
            fullWidth
            label="Lesson Description"
            value={lessonDescription}
            onChange={(e) => setLessonDescription(e.target.value)}
            error={!!errors.lessonDescription}
            helperText={errors.lessonDescription}
          />
          <TextField
            fullWidth
            label="Lesson Content"
            value={lessonContent}
            onChange={(e) => setLessonContent(e.target.value)}
            error={!!errors.lessonContent}
            helperText={errors.lessonContent}
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary">
            Update Lesson
          </Button>
        </form>
      ) : (
        <Typography>Loading...</Typography>  /* If it doesnt fetch a proper lesson ID.*/ 
      )}
    </Box>
  );
};

export default EditLessonPage;
