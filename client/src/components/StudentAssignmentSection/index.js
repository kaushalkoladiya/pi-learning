import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import swal from 'sweetalert';
import styles from '../../app/student/studentdashboard.module.css';
import InputFileUpload from '../UploadFile';
import { submitAssignment } from '@/api';

const StudentAssignmentSection = ({ assignments = [] }) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionUrl, setSubmissionUrl] = useState(null);

  const handleClose = () => {
    setSelectedAssignment(null);
  };

  const handleSubmission = async (payload) => {
    // Submit the assignment
    try {
      const { data } = await submitAssignment(selectedAssignment.id, payload);

      swal({
        title: "Success!",
        text: data.message,
        icon: "success",
      });

      // Close the dialog
      handleClose();
    } catch (error) {
      swal({
        title: "Error!",
        text: error?.response?.data?.error || "An error occurred while submitting the assignment",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <Typography variant="h5" className={styles.courseList}>
        Upcoming Assignments:
      </Typography>
      <TableContainer component={Paper} sx={{
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '15px',
        mt: 2,
        border: '3px solid #e0e0e0'
      }}>
        <Table sx={{ borderCollapse: 'separate', borderSpacing: '0' }}>
          <TableHead>
            <TableRow>
              <TableCell>Assignment Name</TableCell>
              <TableCell>Assignment ID</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{item.assignment_name}</TableCell>
                <TableCell>#{index + 1}</TableCell>
                <TableCell>{item?.Course?.course_code} - {item?.Course?.course_name}</TableCell>
                <TableCell>{item.due_date}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setSelectedAssignment(item)}
                  >Submit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Assignment submit modal */}
      <Dialog
        open={!!selectedAssignment}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData).entries());

            const payload = {
              submission_content: formJson.submission_content,
              submission_url: submissionUrl,
            };

            // validate the payload
            if (!payload.submission_content && !payload.submission_url) {
              swal({
                title: "Error!",
                text: "Please provide a submission content or upload a file",
                icon: "error",
              });
              return;
            }

            handleSubmission(payload);
          },
        }}
      >
        <DialogTitle>Assignment Submission</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="submission_content"
            name="submission_content"
            label="Assignment Content"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
          />
          <InputFileUpload onUpload={setSubmissionUrl} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default StudentAssignmentSection