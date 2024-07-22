import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { format, differenceInDays } from 'date-fns';
import { getAssignmentsByCourse } from '@/api/instructor';

const AssignmentList = ({ courseId }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    (async () => {
      const assignmentsResponse = await getAssignmentsByCourse(courseId);
        setAssignments(assignmentsResponse.data);
    })();
  }, []);


  const renderAssignment = (assignment) => {
    const isLate = differenceInDays(new Date(), new Date(assignment.due_date)) > 0;

    return (
      <ListItem key={assignment.id} style={{ backgroundColor: isLate ? '#ffcccc' : 'inherit' }}>
        <ListItemText
          primary={assignment.assignment_name}
          secondary={`Due: ${format(new Date(assignment.due_date), 'yyyy-MM-dd')}`}
        />
        <Button variant="contained" color="primary" onClick={() => onGradeAssignment(assignment.id)}>
          Grade
        </Button>
      </ListItem>
    );
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Assignments
      </Typography>
      <List>
        {assignments.length > 0 ? (
          assignments.map(renderAssignment)
        ) : (
          <Typography variant="body2">No assignments available for this course.</Typography>
        )}
      </List>
    </div>
  );
};

export default AssignmentList;
