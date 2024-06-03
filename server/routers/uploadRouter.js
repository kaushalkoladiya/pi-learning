import express from 'express';
import multer from 'multer';
import { MulterAzureStorage } from 'multer-azure-blob-storage';
import dotenv from 'dotenv';
dotenv.config();

const uploadRouter = express.Router();


const resolveBlobName = (req, file) => {
  return new Promise((resolve, reject) => {
    const blobName = yourCustomLogic(req, file);
    resolve(blobName);
  });
};

const resolveMetadata = (req, file) => {
  return new Promise((resolve, reject) => {
    const metadata = yourCustomLogic(req, file);
    resolve(metadata);
  });
};

const resolveContentSettings = (req, file) => {
  return new Promise((resolve, reject) => {
    const contentSettings = yourCustomLogic(req, file);
    resolve(contentSettings);
  });
};

console.log(process.env.AZURE_STORAGE_CONNECTION_STRING);
console.log(process.env.AZURE_STORAGE_CONTAINER_NAME);
console.log(process.env.AZURE_STORAGE_ACCOUNT_NAME);
console.log(process.env.AZURE_STORAGE_ACCESS_KEY);

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