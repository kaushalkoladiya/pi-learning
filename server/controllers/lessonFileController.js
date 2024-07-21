import LessonFile from '../models/LessonFileModel.js';
import Lesson from '../models/LessonModel.js';

export const createLessonFile = async (req, res) => {
  const { lesson_id, file_id, file_name, file_url } = req.body;

  try {
    const existingLessonFile = await LessonFile.findOne({
      where: { file_id_id: req.body.file_id },
    });
    if (existingLessonFile) {
      return res.status(400).send({ error: "File ID must be unique" });
    }
    // Create a new lesson file entry
    const lessonFile = await LessonFile.create({
      file_id,
      file_name,
      file_url,
      lesson_id,
    });

    res.status(201).send(lessonFile);
  } catch (error) {
    console.error('Error creating lesson file:', error);
    res.status(500).send({ error: 'Failed to create lesson file' });
  }
};
