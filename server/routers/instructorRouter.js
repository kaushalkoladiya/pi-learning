import express from 'express';
import authenticateToken from '../middleware/AuthMiddleware.js';
import { 
  getAssignmentById,
  getAssignmentsByCourse, 
  getCoursesByInstructor, 
  getLessonsByCourse, 
  getStudentsByCourse, 
  getSubmissionGrades, 
  getSubmissionsByAssignment, 
  getUserGradesByUser, 
  saveGrade,
} from '../controllers/teacherController.js';

const instructorRouter = express.Router();

instructorRouter.get('/students', authenticateToken, getStudentsByCourse);
instructorRouter.get('/assignments', authenticateToken, getAssignmentsByCourse);
instructorRouter.get('/lessons', authenticateToken, getLessonsByCourse);
instructorRouter.get('/courses', authenticateToken, getCoursesByInstructor);
instructorRouter.get('/courses/assignments/:assignmentId/submissions', authenticateToken, getSubmissionsByAssignment);
instructorRouter.get('/courses/assignments/:assignmentId/submissions/:submissionId', authenticateToken, getSubmissionGrades);
instructorRouter.put('/courses/assignments/:assignmentId/submissions/:submissionId', authenticateToken, saveGrade);
instructorRouter.get('/assignment/:assignmentId', authenticateToken, getAssignmentById);
instructorRouter.get('/assignments/:assignmentId/students/:studentId/submissions', authenticateToken, getUserGradesByUser);

export default instructorRouter;
