import express from 'express';
import {
    getAllCountries,
} from '../controllers/CountryController.js'; 
const countryRouter = express.Router();


countryRouter.get('/', getAllCountries);

export default countryRouter;