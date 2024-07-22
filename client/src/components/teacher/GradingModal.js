import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box,
} from '@mui/material';
import { submitGrade } from '@/api/instructor';
import swal from 'sweetalert';

const GradingModal = ({ open, onClose, submission, assignment }) => {
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSaveGrade = async () => {
    try {
        await submitGrade(
          assignment.assignment_id, 
          submission.id, 
          +grade,
          feedback,
        );
        onClose();

        swal({
          title: 'Grade Submitted',
          text: 'The grade has been successfully submitted.',
          icon: 'success',
        })
    } catch (error) {
      swal({
        title: 'Error',
        text: error?.response?.data?.error || 'Error saving grade. Please try again later.',
        icon: 'error',
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Grade Submission</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{assignment.assignment_name}</Typography>
        <Typography variant="body1">{assignment.description}</Typography>
        <Box mt={2}>
          <Typography variant="body2">Submitted by: {`${submission.Student.first_name} ${submission.Student.last_name}`}</Typography>
          <Typography variant="body2">Submitted on: {new Date(submission.submission_date).toLocaleDateString()}</Typography>
          <Typography variant="body2">Content: {submission.submission_content}</Typography>
          {submission.submission_url && (
            <Button
              variant="contained"
              color="primary"
              href={submission.submission_url}
              target="_blank"
              style={{ marginTop: '10px' }}
            >
              Download Submission
            </Button>
          )}
        </Box>
        <TextField
          label="Grade"
          variant="outlined"
          fullWidth
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Feedback"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveGrade} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GradingModal;
