import { writeFileSync, readFileSync } from 'fs';
import { randomBytes } from 'crypto';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateSecretKey = () => {
  // Load existing .env file
  const envPath = path.resolve(__dirname, '../.env');
  const envConfig = dotenv.config().parsed || {};

  // Generate a new secret key
  const secretKey = randomBytes(64).toString('hex');
  envConfig.JWT_SECRET_KEY = secretKey;

  // Convert the config object back to the dotenv format
  const envConfigString = Object.keys(envConfig)
    .map(key => `${key}=${envConfig[key]}`)
    .join('\n');

  // Write the updated config back to the .env file
  writeFileSync(envPath, envConfigString);

  console.log('JWT secret key generated and added to .env file');

  // Re-load the updated .env file to update process.env
  dotenv.config({ path: envPath });
};

export default generateSecretKey;



