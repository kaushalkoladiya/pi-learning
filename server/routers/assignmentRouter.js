import express from 'express';
import {
    createAssignment,
    getAllAssignments,
    getAssignmentById,
    deleteAssignment,
    submitAssignment,
    updateAssignmentById,
    getAllStudentAssignments,
    getAssignmentsByCourse,
    getSubmissionsForAssignment,
} from '../controllers/assignmentController.js'; 
import authenticateToken from '../middleware/AuthMiddleware.js';

const assignmentRouter = express.Router();


assignmentRouter.post('/', createAssignment);
assignmentRouter.get('/', getAllAssignments);
assignmentRouter.get('/:id', getAssignmentById);
assignmentRouter.put('/:id', updateAssignmentById);
assignmentRouter.delete('/:id', deleteAssignment);
assignmentRouter.post('/submit', authenticateToken, submitAssignment);
assignmentRouter.get('/submissions/:assignmentId', authenticateToken, getSubmissionsForAssignment);

export default assignmentRouter;
