import express from 'express';
import { getCounts } from '../controllers/CountController.js';

const countRouter = express.Router();

countRouter.get('/', getCounts);
  
  export default countRouter;