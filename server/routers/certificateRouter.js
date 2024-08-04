import express from 'express';
import { issueCertificate, getCertificates } from '../controllers/CertificateController.js';
import authenticateToken from '../middleware/AuthMiddleware.js';

const certificateRouter = express.Router();

certificateRouter.post('/issue', authenticateToken, issueCertificate);
certificateRouter.get('/', authenticateToken, getCertificates);

export default certificateRouter;
