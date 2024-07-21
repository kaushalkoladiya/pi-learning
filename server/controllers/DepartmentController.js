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

// READ a department by code
export const getDepartmentsByCode = async (req, res) => {
    const { code } = req.params;
    try {
      const department = await Department.findOne({ where: { code } });
      if (department) {
        res.status(200).json(department);
      } else {
        res.status(404).json({ error: 'Department not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Error fetching department: " + error.message });
    }
  };