import express from 'express';
import authenticateToken from '../middleware/AuthMiddleware.js';
import { getStudentCourses, getStudentDashboard } from '../controllers/StudentController.js';

const studentRouter = express.Router();

studentRouter.get('/dashboard', authenticateToken, getStudentDashboard);
studentRouter.get('/courses', authenticateToken, getStudentCourses);

export default studentRouter;