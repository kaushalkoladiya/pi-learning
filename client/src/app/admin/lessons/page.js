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
  IconButton,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { SERVER_URL } from "@/constants/routes";
import ActionWrapper from "@/components/ActionWrapper";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateLessonModal from "@/components/ModalUI/CreateLessonModal";
import CreateFileModal from "@/components/ModalUI/CreateFileModal";
import AdminWrapper from "@/components/AdminWrapper";
import authMiddleware from "@/utils/authRoute";

const LessonsPage = () => {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState([]);
  const [selectedfiles, setSelectedfiles] = useState([]);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/lessons`);
      const data = await response.json();
      const lessonsWithDetails = await Promise.all(
        data.map(async (lesson) => {
          const courseDetails = await fetchCourseDetails(lesson.course_id);
          const programDetails = await fetchProgramDetails(lesson.program_id);
          const fileData = await fetchfiles(lesson.lesson_id);
          return {
            ...lesson,
            course_name: courseDetails.course_title,
            program_name: programDetails.program_title,
            files: fileData,
          };
        })
      );
      setLessons(lessonsWithDetails);
    } catch (err) {
      setError("Failed to fetch lessons");
    }
  };
  console.log(lessons);
  const fetchCourseDetails = async (courseId) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/courses/details/${courseId}`
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch course details", err);
      return null;
    }
  };

  const fetchProgramDetails = async (programId) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/programs/${programId}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch program details", err);
      return null;
    }
  };

  const fetchfiles = async (lessonId) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/lessons/${lessonId}/files`
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch files", err);
      return [];
    }
  };

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleFileModalOpen = (lesson) => {
    setSelectedLesson(lesson);
    setFileModalOpen(true);
  };

  const handleFileModalClose = () => {
    setFileModalOpen(false);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this lesson?");
    if (confirmed) {
      try {
        const response = await fetch(`${SERVER_URL}/api/lessons/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          await fetchLessons();
        } else {
          console.error("Failed to delete lesson");
        }
      } catch (error) {
        console.error("Error deleting lesson:", error);
      }
    }
  };

  const handleDeletefile = async (lessonId, fileId) => {
    const confirmed = confirm("Are you sure you want to delete this file?");
    if (confirmed) {
      try {
        const response = await fetch(
          `${SERVER_URL}/api/lessons/${lessonId}/files/${fileId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          await fetchLessons();
        } else {
          console.error("Failed to delete file");
        }
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
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
            <Typography variant="h4">Lessons Management</Typography>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              onClick={handleCreateModalOpen}
            >
              Create New Lesson
            </Button>
          </Box>

          {error && (
            <Alert severity="error" onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell sx={{ width: "30%" }}>Description</TableCell>
                <TableCell>Program Name</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Files</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lessons.length > 0 ? (
                lessons.map((lesson) => (
                  <TableRow key={lesson.lesson_id}>
                    <TableCell>{lesson.lesson_id}</TableCell>
                    <TableCell>{lesson.lesson_name}</TableCell>
                    <TableCell>{lesson.lesson_description}</TableCell>
                    <TableCell>{lesson.program_name}</TableCell>
                    <TableCell>{lesson.course_name}</TableCell>
                    <TableCell>
                      {console.log("Files:", lesson.files)}
                      {lesson.files && lesson.files.length > 0 ? (
                        lesson.files.map((file) => (
                          <Box
                            key={file.file_id}
                            display="flex"
                            alignItems="center"
                          >
                            <Typography
                              component="a"
                              href={file.file_url}
                              target="_blank"
                              style={{
                                textDecoration: "underline",
                                color: "#1769aa",
                              }}
                            >
                              {file.file_name}
                            </Typography>
                            <IconButton
                              onClick={() =>
                                handleDeletefile(lesson.lesson_id, file.file_id)
                              }
                              size="small"
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        ))
                      ) : (
                        <Typography>No files</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <ActionWrapper>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{
                            width: "120px",
                            marginRight: "8px",
                            marginBottom: "8px",
                          }}
                          onClick={() => handleFileModalOpen(lesson)}
                        >
                          Add Files
                        </Button>
                      </ActionWrapper>
                      <ActionWrapper>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ width: "120px", marginRight: "8px" }}
                          onClick={() => handleDelete(lesson.lesson_id)}
                        >
                          Delete
                        </Button>
                      </ActionWrapper>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No lessons available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Modals for create, edit and view actions */}
          {createModalOpen && (
            <CreateLessonModal
              open={createModalOpen}
              handleClose={handleCreateModalClose}
              refreshLessons={fetchLessons}
            />
          )}
          {fileModalOpen && (
            <CreateFileModal
              open={fileModalOpen}
              handleClose={handleFileModalClose}
              lessonId={selectedLesson.lesson_id}
              refreshFiles={fetchLessons}
            />
          )}
        </Box>
      </Box>
    </AdminWrapper>
  );
};

export default authMiddleware(LessonsPage);
