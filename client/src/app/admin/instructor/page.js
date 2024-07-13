'use client';

import ActionWrapper from '@/components/ActionWrapper';
import { SERVER_URL } from '@/constants/routes';
import { Alert, Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Instructor = () => {
  const router = useRouter();

  const [instructors, setInstructors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${SERVER_URL}/api/instructors`);
      const data = await response.json();

      setInstructors(data);
    }

    fetchData();
  }, []);

  const handleEdit = (id) => {
    // Redirect to edit page
    router.push(`/admin/instructor/${id}`);
  }

  const handleDelete = async (id) => {
    console.log('Delete', id);

    const response = await fetch(`${SERVER_URL}/api/instructors/${id}`, {
      method: 'DELETE',
    })

    const data = await response.json();

    data.error && setError(data.error)
    response.ok && setInstructors(instructors.filter(instructor => instructor.id !== id));
  };

  const handleCreate = () => {
    router.push('/admin/instructor/create');
  }

  const handleView = (id) => {
    // Redirect to view page
    router.push(`/admin/instructor/${id}?viewonly=true`);
  }

  return (
    <Box>
      <Typography variant='h5'>
        Instructors
      </Typography>

      <Box>
        {/* Create New Button */}
        <Box>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create New
          </Button>
        </Box>

        {/* Table */}
        <Box my={2}>
          {error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {instructors.map((instructor) => (
                <TableRow>
                  <TableCell role='button' onClick={() => handleView(instructor.id)}>{instructor.username}</TableCell>
                  <TableCell>{instructor.email}</TableCell>
                  <TableCell>{instructor.first_name}</TableCell>
                  <TableCell>{instructor.last_name}</TableCell>
                  <TableCell>
                    <ActionWrapper>
                      <Button variant="contained" color="primary"
                        onClick={() => handleEdit(instructor.id)}
                      >
                        Edit
                      </Button>
                      <Button variant="contained" color="error"
                        onClick={() => handleDelete(instructor.id)}
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

export default Instructor