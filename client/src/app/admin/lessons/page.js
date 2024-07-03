'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { SERVER_URL } from '@/constants/routes';
import ActionWrapper from '@/components/ActionWrapper';

const LessonsPage = () => {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch(`${SERVER_URL}/api/lessons`)
      .then((response) => response.json())
      .then((data) => {
        setLessons(data);
      })
      .catch((error) => console.error('Error fetching lessons:', error));
  }, []);

  const handleCreateLesson = () => {
    router.push('/admin/lessons/create');
  };

  const handleEdit = (id) => {
    router.push(`/admin/lessons/${id}`);
  }

  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this lesson?');
    if (confirmed) {
      try {
        const response = await fetch(`${SERVER_URL}/api/lessons/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setLessons((prevLessons) => prevLessons.filter((lesson) => lesson.id !== id));
        } else {
          console.error('Failed to delete lesson');
        }
      } catch (error) {
        console.error('Error deleting lesson:', error);
      }
    }
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
            <TableCell>Course</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lessons.map((lesson) => (
            <TableRow key={lesson.id}>
              <TableCell>{lesson.id}</TableCell>
              <TableCell>{lesson.lesson_name}</TableCell>
              <TableCell>{lesson.lesson_description}</TableCell>
              <TableCell>{lesson.course_id}</TableCell>
              <TableCell>
                <ActionWrapper>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(lesson.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(lesson.id)}
                  >
                    Delete
                  </Button>
                </ActionWrapper>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default LessonsPage;
