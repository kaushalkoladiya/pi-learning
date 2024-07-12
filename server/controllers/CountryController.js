import Country from '../models/CountryModel.js';

// READ all departments
export const getAllCountries = async (req, res) => {
    try {
        const countries = await Country.findAll();
        res.json(countries);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error fetching courses: " + error.message });
    }
};