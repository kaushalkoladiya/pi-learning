import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js'; 
import Course from './CourseModel.js';  

class Lesson extends Model {}

Lesson.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  lesson_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lesson_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  lesson_content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Lesson',
  tableName: 'lessons',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

Lesson.belongsTo(Course, { foreignKey: 'course_id' }); 
Course.hasMany(Lesson, { foreignKey: 'course_id' });   

Lesson.sync();

export default Lesson;
