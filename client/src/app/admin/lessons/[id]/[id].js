'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';

const LessonDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    fetch(`/api/lessons/${id}`)
      .then((response) => response.json())
      .then((data) => setLesson(data))
      .catch((error) => console.error('Error fetching lesson:', error));
  }, [id]);

  if (!lesson) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Lesson Detail</Typography>
      <Typography variant="h6">{lesson.lesson_name}</Typography>
      <Typography>{lesson.lesson_description}</Typography>
      <Typography>{lesson.lesson_content}</Typography>
      <Button variant="contained" color="primary" onClick={() => router.push('/admin/lessons')}>
        Back to Lessons
      </Button>
    </Box>
  );
};

export default LessonDetailPage;
