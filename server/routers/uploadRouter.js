import express from 'express';
import multer from 'multer';
import { MulterAzureStorage } from 'multer-azure-blob-storage';
import dotenv from 'dotenv';
dotenv.config();

const uploadRouter = express.Router();

const azureStorage = new MulterAzureStorage({
  connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
  accessKey: process.env.AZURE_STORAGE_ACCESS_KEY,
  accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME,
  containerName: process.env.AZURE_STORAGE_CONTAINER_NAME,
  containerAccessLevel: 'blob'
});

const upload = multer({
  storage: azureStorage
});

uploadRouter.post('/', upload.any(), (req, res) => {
  try {
    console.log(req.files);
    res.send(req.files);
  } catch (error) {
    console.log(error);
  }

});

export default uploadRouter;