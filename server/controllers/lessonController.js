import Lesson from "../models/LessonModel.js";
import LessonFile from "../models/LessonFileModel.js";

export const createLesson = async (req, res) => {
  try {
    // Create new lesson
    const lesson = await Lesson.create({
      lesson_name: req.body.lesson_name,
      lesson_description: req.body.lesson_description,
      program_id: req.body.program_id,
      course_id: req.body.course_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(201).send(lesson);
  } catch (error) {
    res
      .status(400)
      .send({ error: "Failed to create lesson", details: error.message });
  }
};

export const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.findAll();
    res.json(lessons);
  } catch (error) {
    res.status(500).send({ error: "Error fetching lessons: " + error.message });
  }
};

export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findOne({where: {lesson_id: req.params.id}});
    if (!lesson) {
      return res.status(404).send({ error: "Lesson not found" });
    }
    res.send(lesson);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getLessonByCourseId = async (req, res) => {
  try {
    const lesson = await Lesson.findAll({where: {course_id: req.params.id}});
    if (!lesson) {
      return res.status(404).send({ error: "Lesson not found" });
    }
    res.send(lesson);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const fetchFilesByLessonId = async (req, res) => {
  const lessonId = req.params.id;
  console.log(lessonId);
  try {
    const files = await LessonFile.findAll({
      where: { lesson_id: lessonId },
    });

    if (files.length === 0) {
      return res
        .status(404)
        .json({ message: "No files found for the given lesson ID" });
    }

    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const deleted = await Lesson.destroy({
      where: { lesson_id: req.params.id },
    });
    if (deleted === 0) {
      return res.status(404).send({ error: "Lesson not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteFilesByLessonId = async (req, res) => {
  try {
    const deleted = await LessonFile.destroy({
      where: { file_id: req.params.id },
    });
    if (deleted === 0) {
      return res.status(404).send({ error: "Lesson not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
