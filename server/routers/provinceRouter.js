import express from 'express';
import {
    getAllProvinces,
} from '../controllers/ProvinceController.js'; 
const provinceRouter = express.Router();


provinceRouter.get('/', getAllProvinces);

export default provinceRouter;