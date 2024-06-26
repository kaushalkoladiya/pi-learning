'use client';

import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react'

const Instructor = () => {
  const router  = useRouter();

  const handleEdit = (id) => {
    console.log('Edit', id);

    // Redirect to edit page
    router.push(`/admin/instructor/${id}`);
  }

  const handleDelete = (id) => {
    console.log('Delete', id);

    // Send delete request to server

  };

  const handleCreate = () => {
    router.push('/admin/instructor/create');
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
        <Box>
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
              <TableRow>
                <TableCell>username</TableCell>  
                <TableCell>email</TableCell>
                <TableCell>first name</TableCell>
                <TableCell>last name</TableCell>
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

export default Instructor