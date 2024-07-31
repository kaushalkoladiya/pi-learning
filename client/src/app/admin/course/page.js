"use client";

import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Grid, Typography, Avatar } from "@mui/material";
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
  const [error, setError] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/courses`);
      const data = await response.json();
      console.log(data);
      setCourses(data);
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

          <Grid container spacing={2}>
            {Array.isArray(courses) && courses.length > 0 ? (
              courses.map((course) => (
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
          </Grid>
        </Box>
      </Box>
    </AdminWrapper>
  );
};

export default authMiddleware(CourseList);
