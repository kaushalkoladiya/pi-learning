import Joi from 'joi';
import  Assignment  from '../models/AssignmentModel.js'; // Ensure path is correct

export const assignmentSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    dueDate: Joi.date().required(),
    courseId: Joi.number().integer().required()
});

export const createAssignment = async (req, res) => {
    const { error } = assignmentSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const assignment = await Assignment.create(req.body);
        res.status(201).send(assignment);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.findAll();
        res.json(assignments);
    } catch (error) {
        res.status(500).send({ error: "Error fetching assignments: " + error.message });
    }
};

export const getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findByPk(req.params.id);
        if (!assignment) {
            return res.status(404).send({ error: 'Assignment not found' });
        }
        res.send(assignment);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateAssignment = async (req, res) => {
    const { error } = assignmentSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const updated = await Assignment.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated[0] === 0) {
            return res.status(404).send({ error: 'Assignment not found' });
        }
        const updatedAssignment = await Assignment.findByPk(req.params.id);
        res.send(updatedAssignment);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteAssignment = async (req, res) => {
    try {
        const deleted = await Assignment.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 0) {
            return res.status(404).send({ error: 'Assignment not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};
