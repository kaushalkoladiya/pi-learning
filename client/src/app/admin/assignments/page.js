'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const AssignmentsPage = () => {
  const router = useRouter();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch('/api/assignments')
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
        const response = await fetch(`/api/assignments/${id}`, {
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
        <TableRow> 
        { /* dummy d but buttons setup*/}
                <TableCell>JSA-1</TableCell>  
                <TableCell>Calculator App</TableCell>
                <TableCell>Advanced JavaScript Spring 2024 Calculator App</TableCell>
                <TableCell>June 19 2024</TableCell>
                
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
          {assignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>{assignment.id}</TableCell>
              <TableCell>{assignment.assignment_name}</TableCell>
              <TableCell>{assignment.assignment_description}</TableCell>
              <TableCell>{assignment.due_date}</TableCell>
              <TableCell>
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
                <Button
                  variant="contained"
                  color="default"
                  onClick={() => router.push(`/admin/assignments/${assignment.id}`)}
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

export default AssignmentsPage;
