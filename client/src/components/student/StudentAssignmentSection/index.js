import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
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
  CircularProgress,
  Box,
  Grid
} from '@mui/material';
import swal from 'sweetalert';
import InputFileUpload from '../../UploadFile';
import { submitAssignment } from '@/api';
import { fetchSubmissionsForAssignment } from '@/api/student';
import { AZURE_BASE_URL } from '@/constants';

const StudentAssignmentSection = ({ assignments = [] }) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionUrl, setSubmissionUrl] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);

  const handleClose = () => {
    setSelectedAssignment(null);
    setSubmissionUrl(null);
    setSubmissions([]);
    setLoadingSubmissions(true);
  };

  const handleSubmission = async (payload) => {
    // Submit the assignment
    try {
      const { data } = await submitAssignment(selectedAssignment.assignment_id, payload);

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

  const handleOpenDialog = async (assignment) => {
    setSelectedAssignment(assignment);
    try {
      const { data } = await fetchSubmissionsForAssignment(assignment.assignment_id);
      setSubmissions(data.submissions);
      // setSelectedAssignment(data.assignment);
      setLoadingSubmissions(false);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setLoadingSubmissions(false);
    }
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6">
          Upcoming Assignments:
        </Typography>
        <TableContainer component={Paper}>
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
                  <TableCell>{item?.course?.course_title}</TableCell>
                  <TableCell>{item.due_date}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpenDialog(item)}
                    >View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
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
              assignment_id: selectedAssignment.assignment_id,
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
        <DialogTitle>Assignment Details</DialogTitle>
        <DialogContent>
          {selectedAssignment && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>{selectedAssignment.assignment_name}</Typography>
                <Typography variant="body2" gutterBottom>Due Date: {selectedAssignment.due_date}</Typography>
                <Typography variant="body2" gutterBottom>Course: {selectedAssignment.course.course_title}</Typography>
                {
                  selectedAssignment.assignment_url && (
                    <Typography variant="body2" gutterBottom>
                      Assignment Files: <a href={selectedAssignment.assignment_url} target="_blank" rel="noopener noreferrer">download</a>
                    </Typography>
                  )
                }

                <Box component={Paper} p={2} my={4}>
                  <Typography variant="h6" gutterBottom>Submit Assignment</Typography>
                  <Box mt={2}>
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

                    <Box my={2} textAlign={'right'}>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit">Submit</Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom mt={3}>Previous Submissions</Typography>
                {loadingSubmissions ? (
                  <CircularProgress />
                ) : (
                  submissions.map((submission) => (
                    <Card key={submission.id} variant="outlined" sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="body2">Submission Date: {submission.submission_date}</Typography>
                        <Typography variant="body2">Content: {submission.submission_content}</Typography>
                        {submission.submission_url && <Typography variant="body2">URL: <a href={AZURE_BASE_URL + submission.submission_url} target="_blank" rel="noopener noreferrer">download</a></Typography>}
                        <Typography variant="body2">Grade: {submission.grade || 'Not graded yet'}</Typography>
                        <Typography variant="body2">Feedback: {submission.feedback}</Typography>
                      </CardContent>
                    </Card>
                  ))
                )}
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default StudentAssignmentSection;


// import React, { useState } from 'react'
// import {
//   Button,
//   Card,
//   CardContent,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
// } from '@mui/material'
// import swal from 'sweetalert';
// import InputFileUpload from '../UploadFile';
// import { submitAssignment } from '@/api';

// const StudentAssignmentSection = ({ assignments = [] }) => {
//   const [selectedAssignment, setSelectedAssignment] = useState(null);
//   const [submissionUrl, setSubmissionUrl] = useState(null);

//   const handleClose = () => {
//     setSelectedAssignment(null);
//   };

//   const handleSubmission = async (payload) => {
//     // Submit the assignment
//     try {
//       const { data } = await submitAssignment(selectedAssignment.id, payload);

//       swal({
//         title: "Success!",
//         text: data.message,
//         icon: "success",
//       });

//       // Close the dialog
//       handleClose();
//     } catch (error) {
//       swal({
//         title: "Error!",
//         text: error?.response?.data?.error || "An error occurred while submitting the assignment",
//         icon: "error",
//       });
//     }
//   };

//   return (
//     <Card elevation={3}>
//       <CardContent>
//         <Typography variant="h6" >
//           Upcoming Assignments:
//         </Typography>
//         <TableContainer component={Paper}>
//           <Table sx={{ borderCollapse: 'separate', borderSpacing: '0' }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Assignment Name</TableCell>
//                 <TableCell>Assignment ID</TableCell>
//                 <TableCell>Course Name</TableCell>
//                 <TableCell>Due Date</TableCell>
//                 <TableCell></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {assignments.map((item, index) => (
//                 <TableRow key={item.id}>
//                   <TableCell>{item.assignment_name}</TableCell>
//                   <TableCell>#{index + 1}</TableCell>
//                   <TableCell>{item?.course?.course_title}</TableCell>
//                   <TableCell>{item.due_date}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => setSelectedAssignment(item)}
//                     >Submit</Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//       {/* Assignment submit modal */}
//       <Dialog
//         open={!!selectedAssignment}
//         onClose={handleClose}
//         PaperProps={{
//           component: 'form',
//           onSubmit: (event) => {
//             event.preventDefault();
//             const formData = new FormData(event.currentTarget);
//             const formJson = Object.fromEntries((formData).entries());

//             const payload = {
//               submission_content: formJson.submission_content,
//               submission_url: submissionUrl,
//               assignment_id: selectedAssignment.assignment_id,
//             };

//             // validate the payload
//             if (!payload.submission_content && !payload.submission_url) {
//               swal({
//                 title: "Error!",
//                 text: "Please provide a submission content or upload a file",
//                 icon: "error",
//               });
//               return;
//             }

//             handleSubmission(payload);
//           },
//         }}
//       >
//         <DialogTitle>Assignment Submission</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             required
//             margin="dense"
//             id="submission_content"
//             name="submission_content"
//             label="Assignment Content"
//             type="text"
//             fullWidth
//             variant="standard"
//             multiline
//             rows={4}
//           />
//           <InputFileUpload onUpload={setSubmissionUrl} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button type="submit">Submit</Button>
//         </DialogActions>
//       </Dialog>

//     </Card>
//   )
// }

// export default StudentAssignmentSection