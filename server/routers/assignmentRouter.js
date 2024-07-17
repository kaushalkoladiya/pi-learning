import express from 'express';
import {
    createAssignment,
    getAllAssignments,
    getAssignmentById,
    updateAssignment,
    deleteAssignment,
    submitAssignment
} from '../controllers/assignmentController.js'; 
import authenticateToken from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/', createAssignment);
router.get('/', getAllAssignments);
router.get('/:id', getAssignmentById);
router.put('/:id', updateAssignment);
router.delete('/:id', deleteAssignment);
router.post('/submit', authenticateToken, submitAssignment);

export default router;
