import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GradingModal from './GradingModal';
import { getAssignmentById, getSubmissionsByAssignment } from '@/api/instructor';

const SubmittedAssignmentsModal = ({ open, onClose, assignmentId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [openGradingModal, setOpenGradingModal] = useState(false);
  const [assignment, setAssignment] = useState(null);

  const fetchSubmissions = async () => {
    try {
      const response = await getSubmissionsByAssignment(assignmentId);
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const fetchAssignment = async () => {
    try {
      const response = await getAssignmentById(assignmentId);
      setAssignment(response.data);
    } catch (error) {
      console.error('Error fetching assignment:', error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchSubmissions();
      fetchAssignment();
    }
  }, [open, assignmentId]);

  const handleOpenGradingModal = (submission) => {
    setSelectedSubmission(submission);
    setOpenGradingModal(true);
  };

  const handleCloseGradingModal = () => {
    setOpenGradingModal(false);
    setSelectedSubmission(null);
    fetchSubmissions();
  };

  // Group submissions by student
  const groupedSubmissions = submissions.reduce((acc, submission) => {
    const studentId = submission.Student.id;
    if (!acc[studentId]) {
      acc[studentId] = [];
    }
    acc[studentId].push(submission);
    return acc;
  }, {});

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Submitted Assignments</DialogTitle>
      <DialogContent>
        {Object.keys(groupedSubmissions).length > 0 ? (
          Object.keys(groupedSubmissions).map((studentId) => {
            const studentSubmissions = groupedSubmissions[studentId];
            const student = studentSubmissions[0].Student;
            return (
              <Accordion key={studentId}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{`${student.first_name} ${student.last_name}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {studentSubmissions.map((submission) => (
                      <ListItem key={submission.id}>
                        <ListItemText
                          primary={`Submitted on: ${new Date(submission.submission_date).toLocaleDateString()}`}
                          secondary={`Grade: ${submission.grade !== null ? submission.grade : 'Not graded yet'}`}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpenGradingModal(submission)}
                        >
                          Grade
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <Typography variant="body2">No submissions available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
      {selectedSubmission && assignment && (
        <GradingModal
          open={openGradingModal}
          onClose={handleCloseGradingModal}
          submission={selectedSubmission}
          assignment={assignment}
        />
      )}
    </Dialog>
  );
};

export default SubmittedAssignmentsModal;
