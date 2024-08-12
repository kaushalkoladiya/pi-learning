import Assignment from "../models/AssignmentModel.js";

// CREATE a new assignment
export const createAssignment = async (req, res) => {
  const {
    assignment_id,
    assignment_name,
    assignment_url,
    due_date,
    lesson_id,
  } = req.body;
  try {
    const existingAssignment = await Assignment.findOne({
      where: { assignment_id: req.body.assignment_id },
    });
    if (existingAssignment) {
      return res.status(400).send({ error: "Assignment ID must be unique" });
    }
    if (assignment_url === "" && due_date === "") {
      const assignment = await Assignment.create({
        assignment_id: assignment_id,
        assignment_name: assignment_name,
        lesson_id: lesson_id,
      });
      res.status(201).json(assignment);
    } else if (assignment_url === "") {
      // Create the assignment
      const assignment = await Assignment.create({
        assignment_id: assignment_id,
        assignment_name: assignment_name,
        due_date: due_date,
        lesson_id: lesson_id,
      });
      res.status(201).json(assignment);
    } else if (due_date === "") {
      // Create the assignment
      const assignment = await Assignment.create({
        assignment_id: assignment_id,
        assignment_name: assignment_name,
        assignment_url: assignment_url,
        lesson_id: lesson_id,
      });
      res.status(201).json(assignment);
    } else {
      // Create the assignment
      const assignment = await Assignment.create({
        assignment_id: assignment_id,
        assignment_name: assignment_name,
        assignment_url: assignment_url,
        due_date: due_date,
        lesson_id: lesson_id,
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
    const assignment = await Assignment.findOne({where: {assignment_id: assignment_id}});
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

        res.status(200).send('Assignment submitted successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}