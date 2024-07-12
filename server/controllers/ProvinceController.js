import Province from '../models/ProvinceModel.js';

// READ all departments
export const getAllProvinces = async (req, res) => {
    try {
        const provinces = await Province.findAll();
        res.json(provinces);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error fetching courses: " + error.message });
    }
};