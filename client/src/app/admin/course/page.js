'use client';

import ActionWrapper from '@/components/ActionWrapper';
import { SERVER_URL } from '@/constants/routes';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Course = () => {
  const router = useRouter();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${SERVER_URL}/courses`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    })()
  }, []);

  const handleEdit = (id) => {
    // Redirect to edit page
    router.push(`/admin/course/${id}`);
  }

  const handleDelete = async (id) => {
    // Send delete request to server
    try {
      const response = await fetch(`${SERVER_URL}/courses/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        // Remove course from state
        setCourses(courses.filter(course => course.id !== id));
      }
    } catch (error) {
      console.log('Error deleting course:', error)
    }
  };

  const handleCreate = () => {
    router.push('/admin/course/create');
  }

  const handleView = async (id) => {
    router.push(`/admin/course/${id}?viewonly=true`);
  };

  return (
    <Box>
      <Typography variant='h5'>
        Courses
      </Typography>

      <Box>
        <Box>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create New
          </Button>
        </Box>

        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Short Code</TableCell>
                <TableCell>Course Description</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {courses.map((course) => (
                <TableRow>
                  <TableCell role='button' onClick={() => handleView(course.id)}>{course.course_name}</TableCell>
                  <TableCell>{course.course_code}</TableCell>
                  <TableCell>{course.course_description}</TableCell>
                  <TableCell>{course.instructor_id}</TableCell>
                  <TableCell>
                    <ActionWrapper>

                      <Button variant="contained" color="primary"
                        onClick={() => handleEdit(course.id)}
                      >
                        Edit
                      </Button>
                      <Button variant="contained" color="error"
                        onClick={() => handleDelete(course.id)}
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
      </Box>
    </Box>
  )
}

export default Course