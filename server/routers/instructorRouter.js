import express from 'express';
import authenticateToken from '../middleware/AuthMiddleware.js';
import { getAssignmentsByCourse, getCoursesByInstructor, getLessonsByCourse, getStudentsByCourse } from '../controllers/teacherController.js';

const instructorRouter = express.Router();

instructorRouter.get('/students', authenticateToken, getStudentsByCourse);
instructorRouter.get('/assignments', authenticateToken, getAssignmentsByCourse);
instructorRouter.get('/lessons', authenticateToken, getLessonsByCourse);
instructorRouter.get('/courses', authenticateToken, getCoursesByInstructor);

export default instructorRouter;
