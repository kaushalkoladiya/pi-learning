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

const ViewProgramModal = ({
  open,
  handleClose,
  programData,
  departmentData,
}) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (programData?.program_id) {
      fetchCourses();
    }
  }, [programData]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/courses/programCode/${programData.program_id}`
      );
      if (Array.isArray(response.data)) {
        setCourses(response.data);
      } else if (response.data && typeof response.data === "object") {
        setCourses([response.data]);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
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
            Program Details
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
                src={programData?.profile_pic}
                alt={`Photo of ${programData?.program_title || "N/A"}`}
                sx={{ width: 150, height: 150, objectFit: "cover", borderRadius: 1 }}
              />
            </Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Program ID:</strong> {programData?.program_id || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Title:</strong> {programData?.program_title || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Short Description:</strong> {programData?.short_description || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Price:</strong> ${programData?.price || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Duration:</strong> {programData?.duration_in_months || "N/A"} Months
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Department:</strong> {departmentData ? departmentData.name : programData?.department_code || "N/A"}
            </Typography>
            <Box mt={4}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Long Description
              </Typography>
              <Typography variant="body1">
                {programData?.long_description || "No long description available"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Courses Included
            </Typography>
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Course ID</strong></TableCell>
                    <TableCell><strong>Course Title</strong></TableCell>
                    <TableCell><strong>Description</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <TableRow key={course?.course_id}>
                        <TableCell>{course?.course_id}</TableCell>
                        <TableCell>{course?.course_title}</TableCell>
                        <TableCell>{course?.short_description}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No courses available
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


ViewProgramModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  programData: PropTypes.object,
  departmentData: PropTypes.object,
};

export default ViewProgramModal;
