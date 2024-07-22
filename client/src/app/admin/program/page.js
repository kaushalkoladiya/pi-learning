"use client";

import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { SERVER_URL } from "@/constants/routes";
import CardItem from "@/components/CardUI";
import CreateProgramModal from "@/components/ModalUI/CreateProgramModal";
import EditProgramModal from "@/components/ModalUI/EditProgramModal";
import ViewProgramModal from "@/components/ModalUI/ViewProgramModal";
import AdminWrapper from "@/components/AdminWrapper";

const ProgramList = () => {
  const router = useRouter();
  const [programs, setPrograms] = useState([]);
  const [error, setError] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/programs`);
      const data = await response.json();
      console.log(data);
      setPrograms(data);
    } catch (err) {
      setError("Failed to fetch programs");
    }
  };

  const fetchDepartmentData = async (departmentCode) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/departments/${departmentCode}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch department data", err);
      return null;
    }
  };

  const handleEdit = (program) => {
    setSelectedProgram(program);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/programs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to delete program");
      } else {
        setPrograms(programs.filter((program) => program.program_id !== id));
      }
    } catch (err) {
      setError("Failed to delete program");
    }
  };

  const handleView = async (program) => {
    setSelectedProgram(program);
    const departmentData = await fetchDepartmentData(program.department_code);
    setDepartmentData(departmentData);
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
    setSelectedProgram(null);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedProgram(null);
    setDepartmentData(null);
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
              Programs Management
            </Typography>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              onClick={handleCreateModalOpen}
            >
              Create New Program
            </Button>
          </Box>

          {error && (
            <Alert severity="error" onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2}>
            {Array.isArray(programs) && programs.length > 0 ? (
              programs.map((program) => (
                <Grid item xs={12} sm={6} md={4} key={program?.program_id}>
                  <CardItem
                    imageUrl={program?.profile_pic || "/default-program.png"}
                    title={program?.program_title}
                    subtitle={`$${program?.price}`}
                    description={program?.short_description}
                    onView={() => handleView(program)}
                    onEdit={() => handleEdit(program)}
                    onDelete={() => handleDelete(program?.program_id)}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="h6" align="center" style={{ width: "100%" }}>
                No programs available
              </Typography>
            )}
          </Grid>

          <CreateProgramModal
            open={createModalOpen}
            handleClose={handleCreateModalClose}
            refreshPrograms={fetchPrograms}
          />
          {selectedProgram && (
            <>
              <EditProgramModal
                open={editModalOpen}
                handleClose={handleEditModalClose}
                programData={selectedProgram}
                refreshPrograms={fetchPrograms}
              />
              <ViewProgramModal
                open={viewModalOpen}
                handleClose={handleViewModalClose}
                programData={selectedProgram}
                departmentData={departmentData}
              />
            </>
          )}
        </Box>
      </Box>
    </AdminWrapper>
  );
};

export default ProgramList;
