import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/key', (req, res) => {
    res.json({ secretKey: process.env.JWT_SECRET_KEY });
});

export default router;
