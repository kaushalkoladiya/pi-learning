import { DataTypes, Model } from "sequelize";
import { DATABASE_TABLES } from "../constants/tables.js";
import sequelize from "../database.js";
import Lesson from "./LessonModel.js";

class LessonFile extends Model {}

LessonFile.init(
  {
    file_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    file_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    file_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Lesson,
        key: "lesson_id",
      },
      allowNull: false,
      onDelete: "CASCADE",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: sequelize,
    modelName: DATABASE_TABLES.LESSON_FILE,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

LessonFile.sync();

export default LessonFile;
