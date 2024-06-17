'use client';

import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react'

const Course = () => {
  const router  = useRouter();

  const handleEdit = (id) => {
    console.log('Edit', id);

    // Redirect to edit page
    router.push(`/admin/course/${id}`);
  }

  const handleDelete = (id) => {
    console.log('Delete', id);

    // Send delete request to server

  };

  const handleCreate = () => {
    router.push('/admin/course/create');
  }

  const handleView = (id) => {
    console.log('View', id);

    // Redirect to view page
    router.push(`/admin/course/${id}?viewonly=true`);
  };

  return (
    <Box>
      <Typography variant='h5'>
        Courses
      </Typography>

      <Box>
        {/* Create New Button */}
        <Box>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create New
          </Button>
        </Box>

        {/* Table */}
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
              <TableRow>
                <TableCell onClick={() => handleView(10)}>Course 1</TableCell>
                <TableCell>C1</TableCell>
                <TableCell>Long dfesc</TableCell>
                <TableCell>Instructor 1</TableCell>
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
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  )
}

export default Course