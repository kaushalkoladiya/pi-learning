import express from 'express';
import {
    getUserAddressById,
} from '../controllers/UserAddressController.js'; 
const userAddressRouter = express.Router();


userAddressRouter.get('/:id', getUserAddressById);

export default userAddressRouter;