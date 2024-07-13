import Department from '../models/DepartmentModel.js';

// READ all departments
export const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.json(departments);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error fetching courses: " + error.message });
    }
};