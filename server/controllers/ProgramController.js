import Program from '../models/ProgramModel.js';

export const createProgram = async (req, res) => {
  try {
    const existingProgramID = await Program.findOne({ where: { program_id: req.body.program_id } });
        if (existingProgramID.program_id) {
            return res.status(400).json({ error: 'Program ID must be unique' });
        }
    const { program_id, program_title, short_description, long_description, price, department_code, duration_in_months, profile_pic } = req.body;
    const newProgram = await Program.create({
      program_id,
      program_title,
      short_description,
      long_description,
      price,
      department_code,
      duration_in_months,
      profile_pic,
    });
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProgramByID = async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProgram = async (req, res) => {
  try {
    console.log(req.params.id);
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    const {short_description, long_description, price, duration_in_months, profile_pic } = req.body;
    program.short_description = short_description;
    program.long_description = long_description;
    program.price = price;
    program.duration_in_months = duration_in_months;
    program.profile_pic = profile_pic;

    await program.save();
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    await program.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

