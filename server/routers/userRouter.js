import express from 'express';
import User from '../models/userModel.js';
import { getProfile } from '../controllers/UserController.js';
import authenticate from '../middleware/AuthMiddleware.js';

const userRouter = express.Router();

userRouter.get('/profile', authenticate, getProfile);

userRouter.get('/', async (req, res) => {
  console.log('Request received');

  const users = await User.findAll();

  console.log(users);

  res.send('Hello World');
});

export default userRouter;
