import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import LessonForm from '../../../components/LessonForm';

const EditLessonPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(`/api/lessons/${id}`); // api path here please
        if (res.ok) {
          const data = await res.json();
          setLesson(data);
        } else {
          throw new Error('Lesson not found');
        }
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };
    if (id) {
      fetchLesson();
    }
  }, [id]);

  return (
    <Box>
      <Typography variant="h4">Edit Lesson</Typography>
      {lesson ? (
        <LessonForm initialLesson={lesson} />
      ) : (
        <Typography variant="body1">Loading... Please wait for Pi-Learning minions</Typography>
      )}
    </Box>
  );
};

export default EditLessonPage;
