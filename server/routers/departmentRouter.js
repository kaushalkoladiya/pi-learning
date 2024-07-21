import express from 'express';
import {
    getAllDepartments,
    getDepartmentsByCode
} from '../controllers/DepartmentController.js'; 
const departmentRouter = express.Router();


departmentRouter.get('/', getAllDepartments);
departmentRouter.get('/:code', getDepartmentsByCode);

export default departmentRouter;