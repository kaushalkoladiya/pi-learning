import Course from '../models/CourseModel.js'; 

// CREATE a new course
export const createCourse = async (req, res) => {
    const courseData = {
        course_id: req.body.course_id,
        course_title: req.body.course_title,
        short_description: req.body.short_description,
        long_description: req.body.long_description,
        program_id: req.body.program_id,
        instructor_id: req.body.instructor_id,
        profile_pic: req.body.profile_pic
    };

    try {
        const existingCourse = await Course.findOne({ where: { course_id: courseData.course_id } });
        if (existingCourse) {
            return res.status(400).json({ error: 'Course ID must be unique' });
        }

        const course = await Course.create(courseData);
        res.status(201).json(course);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// READ all courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll({
            include: {
                model: User,
                as: 'Instructor',
                attributes: ['first_name', 'last_name', 'profile_pic'],
            }
        });
        res.json(courses);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error fetching courses: " + error.message });
    }
};

// READ a single course by ID
export const getCourseByProgramCode = async (req, res) => {
    try {
        console.log(req.params);
        const course = await Course.findAll({ where: { program_id: req.params.code} });
        if (!course) {
            return res.status(404).send({ error: 'Course not found' });
        }
        res.send(course);
    } catch (error) {
        res.status(500).send(error);
    }
};

// READ a single course by ID
export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findOne({
            where: { id: req.params.id },
            include: [{
                model: User,
                as: 'Instructor',
                attributes: ['first_name', 'last_name', 'profile_pic'],
            }],
        });
        if (!course) {
            return res.status(404).send({ error: 'Course not found' });
        }

        const assignments = await Assignment.findAll({
            where: {
                course_id: course.get('id')
            }
        });

        const lessons = await Lesson.findAll({
            where: { course_id: course.get('id') }
        });

        return res.send({
            course,
            assignments,
            lessons,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

// UPDATE a course by ID
export const updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const { instructor_id, short_description, long_description, profile_pic } = req.body;

        // Find the course by ID
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).send({ error: 'Course not found' });
        }

        // Update the course with the provided values
        course.instructor_id = instructor_id;
        course.short_description = short_description;
        course.long_description = long_description;
        course.profile_pic = profile_pic;

        // Save the updated course
        await course.save();

        res.send(course);
    } catch (error) {
        res.status(400).send(error);
    }
};

// DELETE a course by ID
export const deleteCourse = async (req, res) => {
    try {
        const deleted = await Course.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 0) {
            return res.status(404).send({ error: 'Course not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};

export const createEnrollment = async (req, res) => {
    try {
        const userId = req.user.id;
        const course_id = +(req.params.id || 0);

        // check if user is already enrolled
        const existingEnrollment = await Enrollment.findOne({
            where: {
                student_id: userId,
                course_id: course_id,
            },
        });

        if (existingEnrollment) {
            return res.status(400).json({
                error: 'You are already enrolled in this course!',
            });
        }

        const enrollment = await Enrollment.create({
            course_id: course_id,
            student_id: userId,
            enrollment_date: new Date(),
        });

        return res.status(201).json(enrollment);
    } catch (error) {
        console.error('Error creating enrollment:', error);
        res.status(500).json({
            error: 'Error creating enrollment: ' + error.message,
        });
    }
};