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

  const handleEdit = (id) => {
    console.log('Edit', id);

    router.push(`/admin/lessons/${id}`);
  }

  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this lesson?');
    if (confirmed) {
      try {
        const response = await fetch(`/api/lessons/${id}`, {
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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow> 
        { /* dummy d but buttons setup*/}
                <TableCell>JS2</TableCell>  
                <TableCell>Advanced JavaScript PROG - 8760</TableCell>
                <TableCell>Advanced JavaScript Spring 2024</TableCell>
                
                <TableCell>
                <Button variant="contained" color="primary"
                    onClick={() => handleEdit(1)}
                  >
                    Edit
                  </Button>
                  <Button variant="contained" color="error"
                    onClick={() => handleDelete('Delete')}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
          {lessons.map((lesson) => (
            <TableRow key={lesson.id}>
              <TableCell>{lesson.id}</TableCell>
              <TableCell>{lesson.lesson_name}</TableCell>
              <TableCell>{lesson.lesson_description}</TableCell>
              <TableCell>
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
                <Button
                  variant="contained"
                  color="default"
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
