"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { SERVER_URL } from "@/constants/routes";
import ActionWrapper from "@/components/ActionWrapper";
import CreateAssignmentModal from "@/components/ModalUI/CreateAssignmentModal";
import EditAssignmentModal from "@/components/ModalUI/EditAssignmentModal";
import AdminWrapper from "@/components/AdminWrapper";
import authMiddleware from "@/utils/authRoute";
import swal from "sweetalert";

const AssignmentsPage = () => {
  const router = useRouter();
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [error, setError] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/assignments`);
      const data = await response.json();
      const assignmentsWithDetails = await Promise.all(
        data.map(async (assignment) => {
          const lessonDetails = await fetchLessonDetails(assignment.lesson_id);
          return {
            ...assignment,
            lesson_name: lessonDetails.lesson_name,
          };
        })
      );
      setAssignments(assignmentsWithDetails);
      setFilteredAssignments(assignmentsWithDetails);
    } catch (err) {
      setError("Failed to fetch assignments");
    }
  };

  const fetchLessonDetails = async (lessonId) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/lessons/${lessonId}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch lesson details", err);
      return null;
    }
  };

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleEditModalOpen = (assignment) => {
    setSelectedAssignment(assignment);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDelete = async (id) => {
    const confirmed = await swal({
      title: "Are you sure?",
      text: "Do you really want to delete this assignment?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (confirmed) {
      try {
        const response = await fetch(`${SERVER_URL}/api/assignments/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          await fetchAssignments();
          swal("Success", "Assignment deleted successfully!", "success");
        } else {
          console.error("Failed to delete assignment");
          swal("Error", "Failed to delete assignment. Please try again.", "error");
        }
      } catch (error) {
        console.error("Error deleting assignment:", error);
        swal("Error", "An error occurred while deleting the assignment. Please try again.", "error");
      }
    }
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchName(value);

    const sanitizedSearchName = value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const filtered = assignments.filter((assignment) => {
      const assignmentName = assignment.assignment_name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      return assignmentName.includes(sanitizedSearchName);
    });

    setFilteredAssignments(filtered);
  };

  return (
    <AdminWrapper>
      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
        <Box sx={{ maxWidth: "1200px", mx: "auto", p: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h4">Assignments Management</Typography>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              onClick={handleCreateModalOpen}
            >
              Create New Assignment
            </Button>
          </Box>

          <Box display="flex" mb={3} gap={2}>
            <TextField
              fullWidth
              label="Search Assignment Name"
              name="searchName"
              value={searchName}
              onChange={handleSearchChange}
              margin="normal"
            />
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Assignment File</TableCell>
                <TableCell>Lesson Name</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAssignments.length > 0 ? (
                filteredAssignments.map((assignment) => (
                  <TableRow key={assignment.assignment_id}>
                    <TableCell>{assignment.assignment_id}</TableCell>
                    <TableCell>
                      <Typography
                        component="a"
                        href={assignment.assignment_url}
                        target="_blank"
                        style={{ textDecoration: "underline", color: "#1769aa" }}
                      >
                        {assignment.assignment_name}
                      </Typography>
                    </TableCell>
                    <TableCell>{assignment.lesson_name}</TableCell>
                    <TableCell>
                      {new Date(assignment.due_date).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <ActionWrapper>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{
                            width: "80px",
                            marginRight: "8px",
                            marginBottom: "8px",
                          }}
                          onClick={() => handleEditModalOpen(assignment)}
                        >
                          Edit
                        </Button>
                      </ActionWrapper>
                      <ActionWrapper>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ width: "80px", marginRight: "8px" }}
                          onClick={() => handleDelete(assignment.assignment_id)}
                        >
                          Delete
                        </Button>
                      </ActionWrapper>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No assignments available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {createModalOpen && (
            <CreateAssignmentModal
              open={createModalOpen}
              handleClose={handleCreateModalClose}
              refreshAssignments={fetchAssignments}
            />
          )}
          {editModalOpen && (
            <EditAssignmentModal
              open={editModalOpen}
              handleClose={handleEditModalClose}
              assignment={selectedAssignment}
              refreshAssignments={fetchAssignments}
            />
          )}
        </Box>
      </Box>
    </AdminWrapper>
  );
};

export default authMiddleware(AssignmentsPage);
