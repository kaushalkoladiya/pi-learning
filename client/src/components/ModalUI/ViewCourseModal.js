import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import PropTypes from "prop-types";
import axios from "axios";
import { SERVER_URL } from "@/constants/routes";

const ViewCourseModal = ({ open, handleClose, courseData }) => {
  const [lessons, setLessons] = useState([]);
  const [programName, setProgramName] = useState("");
  const [instructorName, setInstructorName] = useState("");

  useEffect(() => {
    if (courseData?.course_id) {
      fetchLessons();
      fetchProgramName();
      fetchInstructorName();
    }
  }, [courseData]);

  const fetchLessons = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/lessons/course/${courseData.course_id}`
      );
      setLessons(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  const fetchProgramName = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/programs/${courseData.program_id}`
      );
      setProgramName(response.data.program_title);
    } catch (error) {
      console.error("Error fetching program name:", error);
    }
  };

  const fetchInstructorName = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/instructors/${courseData.instructor_id}`
      );
      const instructor = response.data;
      setInstructorName(`${instructor.first_name} ${instructor.last_name}`);
    } catch (error) {
      console.error("Error fetching instructor name:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 1200,
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor: "white",
          boxShadow: 24,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Course Details
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
              <Avatar
                src={courseData?.profile_pic}
                alt={`Photo of ${courseData?.course_title || "N/A"}`}
                sx={{ width: 150, height: 150, objectFit: "cover", borderRadius: 1 }}
              />
            </Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Course ID:</strong> {courseData?.course_id || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Title:</strong> {courseData?.course_title || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Program Name:</strong> {programName || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Instructor Name:</strong> {instructorName || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Short Description:</strong> {courseData?.short_description || "N/A"}
            </Typography>
            <Box mt={4}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Long Description
              </Typography>
              <Typography variant="body1">
                {courseData?.long_description || "No long description available"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Lessons Included
            </Typography>
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Lesson ID</strong></TableCell>
                    <TableCell><strong>Lesson Title</strong></TableCell>
                    <TableCell><strong>Description</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lessons.length > 0 ? (
                    lessons.map((lesson) => (
                      <TableRow key={lesson?.lesson_id}>
                        <TableCell>{lesson?.lesson_id}</TableCell>
                        <TableCell>{lesson?.lesson_name}</TableCell>
                        <TableCell>{lesson?.lesson_description}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No lessons available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

ViewCourseModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  courseData: PropTypes.object,
};

export default ViewCourseModal;
