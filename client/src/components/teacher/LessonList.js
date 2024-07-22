import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { getLessonsByCourse } from '@/api/instructor';

const LessonList = ({ courseId }) => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    (async () => {
      const lessonsResponse = await getLessonsByCourse(courseId);
      
      setLessons(lessonsResponse.data);
    })();
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Lessons
      </Typography>
      <List>
        {lessons.length > 0 ? (
          lessons.map((lesson) => (
            <ListItem key={lesson.id}>
              <ListItemText primary={lesson.lesson_name} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2">No lessons available for this course.</Typography>
        )}
      </List>
    </div>
  );
};

export default LessonList;
