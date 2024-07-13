'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { SERVER_URL } from '@/constants/routes';
import ActionWrapper from '@/components/ActionWrapper';

const AssignmentsPage = () => {
  const router = useRouter();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch(`${SERVER_URL}/api/assignments`)
      .then((response) => response.json())
      .then((data) => setAssignments(data))
      .catch((error) => console.error('Error fetching assignments:', error));
  }, []);

  const handleCreateAssignment = () => {
    router.push('/admin/assignments/create');
  };

  const handleEdit = (id) => {
    console.log('Edit', id);
    router.push(`/admin/assignments/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this assignment?');
    if (confirmed) {
      try {
        const response = await fetch(`${SERVER_URL}/api/assignments/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setAssignments((prevAssignments) => prevAssignments.filter((assignment) => assignment.id !== id));
        } else {
          console.error('Failed to delete assignment');
        }
      } catch (error) {
        console.error('Error deleting assignment:', error);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Assignments</Typography>
      <Button variant="contained" color="primary" onClick={handleCreateAssignment}>
        Create Assignment
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>{assignment.id}</TableCell>
              <TableCell>{assignment.assignment_name}</TableCell>
              <TableCell>{assignment.assignment_description}</TableCell>
              <TableCell>{assignment.due_date}</TableCell>
              <TableCell>
                <ActionWrapper>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(assignment.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(assignment.id)}
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

export default AssignmentsPage;
