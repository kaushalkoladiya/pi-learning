import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import Course from './CourseModel.js';

class Assignment extends Model {}

Assignment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  assignment_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  assignment_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
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
  modelName: 'Assignment',
  tableName: 'assignments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

Assignment.belongsTo(Course, { foreignKey: 'course_id' });
Course.hasMany(Assignment, { foreignKey: 'course_id' });

Assignment.sync();

export default Assignment;
