import express from 'express';
import authenticateToken from '../middleware/AuthMiddleware.js';
import { getStudentDashboard } from '../controllers/StudentController.js';

const studentRouter = express.Router();

studentRouter.get('/dashboard', authenticateToken, getStudentDashboard);

export default studentRouter;