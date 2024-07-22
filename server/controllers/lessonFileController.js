import LessonFile from '../models/LessonFileModel.js';

export const createLessonFile = async (req, res) => {
  const { lesson_id, file_name, file_url } = req.body;

  try {
    // Create a new lesson file entry
    const lessonFile = await LessonFile.create({
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
