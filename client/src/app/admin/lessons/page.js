import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const LessonsPage = () => {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await fetch('/api/lessons');
        if (res.ok) {
          const data = await res.json();
          setLessons(data);
        } else {
          throw new Error('Failed to fetch lessons');
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };
    fetchLessons();
  }, []);

  const handleEdit = (id) => {
    router.push(`/admin/lessons/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/lessons/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setLessons(lessons.filter((lesson) => lesson.id !== id));
      } else {
        throw new Error('Failed to delete lesson');
      }
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const handleCreate = () => {
    router.push('/admin/lessons/create');
  };

  return (
    <Box>
      <Typography variant="h4">Lessons</Typography>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create New Lesson
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Lesson Name</TableCell>
            <TableCell>Course Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lessons.map((lesson) => (
            <TableRow key={lesson.id}>
              <TableCell>{lesson.id}</TableCell>
              <TableCell>{lesson.lesson_name}</TableCell>
              <TableCell>{lesson.Course ? lesson.Course.course_name : '-'}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEdit(lesson.id)}>
                  Edit
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(lesson.id)}>
                  Delete
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
