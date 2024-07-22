"use client";

import CreateInstructorModal from "@/components/ModalUI";
import EditModal from "@/components/ModalUI/EditModal";
import ViewModal from "@/components/ModalUI/ViewModal";
import CardItem from "@/components/CardUI";
import { SERVER_URL } from "@/constants/routes";
import { Alert, Box, Button, Grid, Typography } from "@mui/material";
import ActionWrapper from "@/components/ActionWrapper";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AdminWrapper from "@/components/AdminWrapper";

const Instructor = () => {
  const router = useRouter();
  const [instructors, setInstructors] = useState([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [selectedInstructorAddress, setSelectedInstructorAddress] =
    useState(null);
  const [selectedInstructorDepartment, setSelectedInstructorDepartment] =
    useState(null);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/instructors`);
      const data = await response.json();
      setInstructors(data);
    } catch (err) {
      setError("Failed to fetch instructors");
    }
  };

  const fetchInstructorAddress = async (instructorId) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/user_address/${instructorId}`
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch instructor address", err);
      return null;
    }
  };

  const fetchInstructorDepartment = async (departmentCode) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/departments/${departmentCode}`
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch instructor department", err);
      return null;
    }
  };

  const handleEdit = async (instructor) => {
    const addressData = await fetchInstructorAddress(instructor.id);
    setSelectedInstructor(instructor);
    setSelectedInstructorAddress(addressData);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/instructors/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to delete instructor");
      } else {
        setInstructors(
          instructors.filter((instructor) => instructor.id !== id)
        );
      }
    } catch (err) {
      setError("Failed to delete instructor");
    }
  };

  const handleView = async (instructor) => {
    const addressData = await fetchInstructorAddress(instructor.id);
    if (instructor.department_code !== "null") {
      const departmentData = await fetchInstructorDepartment(
        instructor.department_code
      );
      setSelectedInstructorDepartment(departmentData);
    }
    setSelectedInstructor(instructor);
    setSelectedInstructorAddress(addressData);

    setViewModalOpen(true);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedInstructor(null);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedInstructor(null);
    setSelectedInstructorAddress(null);
    setSelectedInstructorDepartment(null);
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
              Instructors Management
            </Typography>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              onClick={handleModalOpen}
            >
              Create New Instructor
            </Button>
          </Box>

          {error && (
            <Alert severity="error" onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2}>
            {Array.isArray(instructors) && instructors.length > 0 ? (
              instructors.map((instructor) => (
                <Grid item xs={12} sm={6} md={4} key={instructor?.id}>
                  <CardItem
                    imageUrl={instructor?.profile_pic || "/default-profile.png"}
                    title={`${instructor?.first_name} ${instructor?.last_name}`}
                    subtitle={null} // No subtitle for instructor
                    description={
                      instructor?.biography || "No biography available"}
                    onView={() => handleView(instructor)}
                    onEdit={() => handleEdit(instructor)}
                    onDelete={() => handleDelete(instructor?.id)}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="h6" align="center" style={{ width: "100%" }}>
                No instructors available
              </Typography>
            )}
          </Grid>

          <CreateInstructorModal
            open={modalOpen}
            handleClose={handleModalClose}
            refreshInstructors={fetchInstructors}
          />
          {selectedInstructor && (
            <>
              <EditModal
                open={editModalOpen}
                handleClose={handleEditModalClose}
                userData={selectedInstructor}
                addressData={selectedInstructorAddress}
                refreshUsers={fetchInstructors}
              />
              <ViewModal
                open={viewModalOpen}
                handleClose={handleViewModalClose}
                userData={selectedInstructor}
                addressData={selectedInstructorAddress}
                departmentData={selectedInstructorDepartment}
              />
            </>
          )}
        </Box>
      </Box>
    </AdminWrapper>
  );
};

export default Instructor;
