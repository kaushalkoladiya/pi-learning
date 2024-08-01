import Assignment from "../models/AssignmentModel.js";
import AssignmentSubmission from "../models/AssignmentSubmissionModel.js";
import Course from "../models/CourseModel.js";
import Enrollment from "../models/EnrollmentModel.js";
import Lesson from "../models/LessonModel.js";

// CREATE a new assignment
export const createAssignment = async (req, res) => {
  const {
    assignment_name,
    assignment_url,
    due_date,
    lesson_id,
    course_id,
  } = req.body;

  console.log(req.body);
  try {
    if (assignment_url === "") {
      // Create the assignment
      const assignment = await Assignment.create({
        assignment_name: assignment_name,
        due_date: due_date,
        lesson_id: lesson_id,
        course_id: course_id,
      });
      res.status(201).json(assignment);
    } else {
      // Create the assignment
      const assignment = await Assignment.create({
        assignment_name: assignment_name,
        assignment_url: assignment_url,
        due_date: due_date,
        lesson_id: lesson_id,
        course_id: course_id,
      });
      res.status(201).json(assignment);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// READ all assignments
export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.findAll();
    res.json(assignments);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error fetching assignments: " + error.message });
  }
};

// READ a single assignment by ID
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) {
      return res.status(404).send({ error: "Assignment not found" });
    }
    res.send(assignment);
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPDATE an assignment by ID
export const updateAssignmentById = async (req, res) => {
  console.log(req.body);
  const {
    assignment_id,
    assignment_name,
    assignment_url,
    due_date } = req.body;

  try {
    const assignment = await Assignment.findOne({ where: { assignment_id: assignment_id } });
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    assignment.assignment_url = assignment_url;
    assignment.due_date = due_date;

    await assignment.save();

    res.status(200).json(assignment);
  } catch (error) {
    console.error('Error updating assignment:', error);
    res.status(500).json({ error: 'An error occurred while updating the assignment' });
  }
};


// DELETE an assignment by ID
export const deleteAssignment = async (req, res) => {
  try {
    const deleted = await Assignment.destroy({
      where: { assignment_id: req.params.id },
    });
    if (deleted === 0) {
      return res.status(404).send({ error: "Assignment not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

export const submitAssignment = async (req, res) => {
  try {
    const studentId = req.user.id;

    console.log(req.body);
    if (!req.body.assignment_id) {
      return res.status(400).send({ error: 'Assignment ID is required' });
    }

    if (!req.body.submission_url && !req.body.submission_content) {
      return res.status(400).send({ error: 'Submission content or URL is required' });
    }

    // Ensure the assignment exists before submitting
    const assignment = await Assignment.findByPk(req.body.assignment_id);

    if (!assignment) {
      return res.status(404).send({ error: 'Assignment not found' });
    }

    // Check due date
    const dueDate = new Date(assignment.get('due_date'));
    const currentDate = new Date();

    if (currentDate > dueDate) {
      return res.status(400).send({ error: 'Assignment is past due date' });
    }

    // Ensure the student is enrolled in the course
    const enrollment = await Enrollment.findOne({
      where: {
        student_id: studentId,
        course_id: assignment.get('course_id'),
      },
    });

    if (!enrollment) {
      return res.status(401).send({ error: 'You are not enrolled in this course' });
    }

    // Save the submission
    const submission = await AssignmentSubmission.create({
      student_id: studentId,
      submission_url: req.body.submission_url,
      submission_content: req.body.submission_content,
      course_id: assignment.get('course_id'),
      assignment_id: req.body.assignment_id,
    });

    res.status(200).send(submission);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export const getAllStudentAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.findAll({
      include: [
        {
          model: Course,
          attributes: ['course_title', 'course_id'],
          as: 'course',
        },
      ],
    });
    res.status(200).json(assignments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Get assignments by course
export const getAssignmentsByCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const assignments = await Assignment.findAll({
      where: { course_id: courseId },
      include: [
        {
          model: Course,
          attributes: ['course_title'],
          as: 'course',
        },
      ],
    });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get submissions for an assignment
export const getSubmissionsForAssignment = async (req, res) => {
  const { assignmentId } = req.params;
  try {
    const assignment = await Assignment.findByPk(assignmentId);

    const submissions = await AssignmentSubmission.findAll({
      where: { assignment_id: assignmentId },
      include: [
        {
          model: Course,
          attributes: ['course_title'],
          as: 'course',
        },
        {
          model: Assignment,
          attributes: ['assignment_name'],
          as: 'assignment',
          include: [
            {
              model: Lesson,
              attributes: ['lesson_name'],
              as: 'lesson',
            },
          ],
        },
      ],
    });
    res.status(200).json({ submissions, assignment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};