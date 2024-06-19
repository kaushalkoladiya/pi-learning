'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const LessonsPage = () => {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch('/api/lessons')
      .then((response) => response.json())
      .then((data) => setLessons(data))
      .catch((error) => console.error('Error fetching lessons:', error));
  }, []);

  const handleCreateLesson = () => {
    router.push('/admin/lessons/create');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Lessons</Typography>
      <Button variant="contained" color="primary" onClick={handleCreateLesson}>
        Create Lesson
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lessons.map((lesson) => (
            <TableRow key={lesson.id}>
              <TableCell>{lesson.id}</TableCell>
              <TableCell>{lesson.lesson_name}</TableCell>
              <TableCell>{lesson.lesson_description}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push(`/admin/lessons/${lesson.id}`)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default LessonsPage;
