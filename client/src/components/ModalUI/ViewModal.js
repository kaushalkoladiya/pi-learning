import React from "react";
import { Box, Modal, Typography, Grid, IconButton, Avatar } from "@mui/material";
import { Close } from "@mui/icons-material";
import PropTypes from "prop-types";

const capitalizeFirstLetter = (string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return "";
  };

const ViewModal = ({
  open,
  handleClose,
  userData,
  addressData,
  departmentData,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          backgroundColor: "white",
          boxShadow: 24,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Profile</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Grid>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <Box display="flex" justifyContent="center"alignItems="center" height="100%">
                <Avatar
                  src={userData?.profile_pic}
                  alt={`Photo of ${userData?.first_name || "N/A"} ${userData?.last_name || "N/A"}`}
                  sx={{ width: '50%', height: 'auto', objectFit: "scale-down" }}
                  variant="square"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Name:</strong> {userData?.first_name || "N/A"}{" "}
                {userData?.last_name || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {userData?.email || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>User Type:</strong>{" "}
                {capitalizeFirstLetter(userData?.user_type) || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Phone Number:</strong> {userData?.phone_number || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Department:</strong>{" "}
                {departmentData
                  ? departmentData.name
                  : userData?.department_code || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Date of Birth:</strong>{" "}
                {userData?.date_of_birth?.split('T')[0] || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong>{" "}
                {addressData
                  ? `${addressData.address || "N/A"}, ${
                      addressData.city || "N/A"
                    }, ${addressData.province_code || "N/A"}, ${
                      addressData.country || "N/A"
                    }, ${addressData.zip_code || "N/A"}`
                  : "No address available"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box mt={4}>
          <Typography variant="h6"><strong>About Me</strong></Typography>
          <Typography variant="body1">
            {userData?.biography || "No biography available"}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

ViewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userData: PropTypes.object,
  addressData: PropTypes.object,
  departmentData: PropTypes.object,
};

export default ViewModal;
