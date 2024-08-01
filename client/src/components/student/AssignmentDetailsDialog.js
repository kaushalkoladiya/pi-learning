import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, Box } from '@mui/material';

const AssignmentDetailsDialog = ({ open, onClose, assignment, handleSubmit, submissionContent, setSubmissionContent, submissionUrl, setSubmissionUrl }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Assignment Details</DialogTitle>
      <DialogContent>
        <Typography variant="h5" gutterBottom>{assignment.assignment_name}</Typography>
        <Typography variant="body2" gutterBottom>Due Date: {assignment.due_date}</Typography>
        <Typography variant="body2" gutterBottom>Course: {assignment.course.course_title}</Typography>
        <Box mt={2}>
          <TextField
            label="Submission Content"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={submissionContent}
            onChange={(e) => setSubmissionContent(e.target.value)}
          />
          <TextField
            label="Submission URL"
            fullWidth
            margin="normal"
            value={submissionUrl}
            onChange={(e) => setSubmissionUrl(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignmentDetailsDialog;
