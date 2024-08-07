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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { SERVER_URL } from "@/constants/routes";
import CardItem from "@/components/CardUI";
import CreateProgramModal from "@/components/ModalUI/CreateProgramModal";
import EditProgramModal from "@/components/ModalUI/EditProgramModal";
import ViewProgramModal from "@/components/ModalUI/ViewProgramModal";
import AdminWrapper from "@/components/AdminWrapper";
import authMiddleware from "@/utils/authRoute";
import swal from "sweetalert";

const ProgramList = () => {
  const router = useRouter();
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [error, setError] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [departmentData, setDepartmentData] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
 

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/programs`);
      const data = await response.json();
      setPrograms(data);
      setFilteredPrograms(data); // Set filteredPrograms initially to all programs
    } catch (err) {
      setError("Failed to fetch programs");
    }
  };

  const fetchDepartmentData = async (departmentCode) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/departments/${departmentCode}`
      );
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
    const confirmation = await swal({
      title: "Are you sure?",
      text: "Do you really want to delete this program?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (confirmation) {
      try {
        const response = await fetch(`${SERVER_URL}/api/programs/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const data = await response.json();
          setError(data.error || "Failed to delete program");
          swal("Error", data.error || "Failed to delete program", "error");
        } else {
          setPrograms(programs.filter((program) => program.program_id !== id));
          swal("Deleted!", "The program has been deleted.", "success");
        }
      } catch (err) {
        setError("Failed to delete program");
        swal("Error", "Failed to delete program. Please try again.", "error");
      }
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

    const filtered = programs.filter((program) => {
      const combinedTitle = program.program_title.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      return combinedTitle.includes(sanitizedSearchTitle);
    });

    setFilteredPrograms(filtered);
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

          <Box display="flex" mb={1} gap={2}>
            <TextField
              fullWidth
              label="Search Program Title"
              name="searchTitle"
              value={searchTitle}
              onChange={handleSearchChange}
              margin="normal"
            />
          </Box>
          <Grid container spacing={2}>
            {Array.isArray(filteredPrograms) && filteredPrograms.length > 0 ? (
              filteredPrograms.map((program) => (
                <Grid item xs={12} sm={6} md={4} key={program?.program_id}>
                  <CardItem
                    imageUrl={program?.profile_pic || ""}
                    avatar={
                      !program?.profile_pic && (
                        <Avatar>
                          {getInitialsFromTitle(program?.program_title)}
                        </Avatar>
                      )
                    }
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

export default authMiddleware(ProgramList);
