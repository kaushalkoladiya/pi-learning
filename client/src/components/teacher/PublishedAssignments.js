import React, { useState, useEffect } from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Button, List, ListItem, ListItemText, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SubmittedAssignmentsModal from './SubmittedAssignmentsModal';
import { getAssignmentsByCourse } from '@/api/instructor';

const PublishedAssignments = ({ courseId }) => {
  const [assignments, setAssignments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const fetchAssignments = async () => {
    try {
      const assignmentsResponse = await getAssignmentsByCourse(courseId);
      setAssignments(assignmentsResponse.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [courseId]);

  const handleOpenModal = (assignmentId) => {
    setSelectedAssignment(assignmentId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAssignment(null);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Published Assignments
      </Typography>
      <List>
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <Accordion key={assignment.assignment_id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{assignment.assignment_name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography variant="body2">Due Date: {assignment.due_date}</Typography>
                  {assignment.assignment_url && (
                    <Button
                      variant="contained"
                      color="primary"
                      href={assignment.assignment_url}
                      target="_blank"
                      style={{ marginTop: '10px' }}
                    >
                      Download File
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenModal(assignment.assignment_id)}
                    style={{ marginTop: '10px' }}
                  >
                    View Submissions
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography variant="body2">No published assignments available for this course.</Typography>
        )}
      </List>
      {selectedAssignment && (
        <SubmittedAssignmentsModal
          open={openModal}
          onClose={handleCloseModal}
          assignmentId={selectedAssignment}
        />
      )}
    </div>
  );
};

export default PublishedAssignments;
