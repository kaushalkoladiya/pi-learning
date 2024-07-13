import express from 'express';
import {
    getAllDepartments,
} from '../controllers/DepartmentController.js'; 
const departmentRouter = express.Router();


departmentRouter.get('/', getAllDepartments);

export default departmentRouter;