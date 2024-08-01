"use client";

import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  Typography,
  Avatar,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { SERVER_URL } from "@/constants/routes";
import CardItem from "@/components/CardUI";
import CreateCourseModal from "@/components/ModalUI/CreateCourseModal";
import EditCourseModal from "@/components/ModalUI/EditCourseModal";
import ViewCourseModal from "@/components/ModalUI/ViewCourseModal";
import AdminWrapper from "@/components/AdminWrapper";
import authMiddleware from "@/utils/authRoute";
import swal from "sweetalert";

const CourseList = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [error, setError] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/courses`);
      const data = await response.json();
      setCourses(data);
      setFilteredCourses(data);
    } catch (err) {
      setError("Failed to fetch courses");
    }
  };

  const handleEdit = async (course) => {
    setSelectedCourse(course);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmation = await swal({
      title: "Are you sure?",
      text: "Do you really want to delete this course?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (confirmation) {
      try {
        const response = await fetch(`${SERVER_URL}/api/courses/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const data = await response.json();
          setError(data.error || "Failed to delete course");
          swal("Error", data.error || "Failed to delete course", "error");
        } else {
          setCourses(courses.filter((course) => course.course_id !== id));
          swal("Deleted!", "The course has been deleted.", "success");
        }
      } catch (err) {
        setError("Failed to delete course");
        swal("Error", "Failed to delete course. Please try again.", "error");
      }
    }
  };

  const handleView = async (course) => {
    setSelectedCourse(course);
    setViewModalOpen(true);
  };

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedCourse(null);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedCourse(null);
  };

  const getInitialsFromTitle = (title) => {
    if (!title) return "";
    const words = title.split(" ");
    return words.length > 1
      ? `${words[0][0]}${words[words.length - 1][0]}`
      : words[0][0];
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTitle(value);

    const sanitizedSearchTitle = value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const filtered = courses.filter((course) => {
      const combinedTitle = course.course_title.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      return combinedTitle.includes(sanitizedSearchTitle);
    });

    setFilteredCourses(filtered);
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
            <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
              Courses Management
            </Typography>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              onClick={handleCreateModalOpen}
            >
              Create New Course
            </Button>
          </Box>

          <Box display="flex" mb={3} gap={2}>
            <TextField
              fullWidth
              label="Search Course Title"
              name="searchTitle"
              value={searchTitle}
              onChange={handleSearchChange}
              margin="normal"
            />
          </Box>

          <Grid container spacing={2}>
            {Array.isArray(filteredCourses) && filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course?.course_id}>
                  <CardItem
                    imageUrl={course?.profile_pic || ""}
                    avatar={
                      !course?.profile_pic && (
                        <Avatar>
                          {getInitialsFromTitle(course?.course_title)}
                        </Avatar>
                      )
                    }
                    title={course?.course_title}
                    subtitle={null}
                    description={course?.short_description}
                    onView={() => handleView(course)}
                    onEdit={() => handleEdit(course)}
                    onDelete={() => handleDelete(course?.course_id)}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="h6" align="center" style={{ width: "100%" }}>
                No courses available
              </Typography>
            )}
          </Grid>

          <CreateCourseModal
            open={createModalOpen}
            handleClose={handleCreateModalClose}
            refreshCourses={fetchCourses}
          />
          {selectedCourse && (
            <>
              <EditCourseModal
                open={editModalOpen}
                handleClose={handleEditModalClose}
                courseData={selectedCourse}
                refreshCourses={fetchCourses}
              />
              <ViewCourseModal
                open={viewModalOpen}
                handleClose={handleViewModalClose}
                courseData={selectedCourse}
              />
            </>
          )}
        </Box>
      </Box>
    </AdminWrapper>
  );
};

export default authMiddleware(CourseList);
