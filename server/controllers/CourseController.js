const pool = require('../config/db');

const getAllCourses = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM courses');
        res.json({ courses: result.rows });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCourseById = async (req, res) => {
    try {
        const result = await pool.query('', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createCourse = async (req, res) => {
    const { course_name, course_description, course_code, instructor_id } = req.body; // integrate or look for alternative for instructor_id in DB
    try {
        const result = await pool.query(
            'INSERT INTO courses (course_name, course_description, course_code, instructor_id) VALUES (, , , ) RETURNING *', //try sample data
            [course_name, course_description, course_code, instructor_id]
        );
        res.status(201).json({ message: 'Course created successfully', course: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateCourse = async (req, res) => {
    const { course_name, course_description, course_code } = req.body;
    try {
        const result = await pool.query(
            'UPDATE courses SET course_name = , course_description = , course_code =  WHERE id =  RETURNING *', // try data
            [course_name, course_description, course_code, req.params.id]
        );
        res.json({ message: 'Course updated successfully', course: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        await pool.query('DELETE FROM courses WHERE id = ', [req.params.id]); // empty id try sample data
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };
