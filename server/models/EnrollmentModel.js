import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import User from './userModel.js';
import Course from './CourseModel.js';

class Enrollment extends Model {}

Enrollment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  course_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'course_id'
    }
  },
  student_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  enrollment_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  modelName: 'Enrollment',
  tableName: 'enrollments',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});


User.hasMany(Enrollment, { foreignKey: 'student_id' });
Enrollment.belongsTo(User, { as: 'Student', foreignKey: 'student_id' });

// Enrollment relations
Course.hasMany(Enrollment, { foreignKey: 'course_id' });
Enrollment.belongsTo(Course, { as: 'Course', foreignKey: 'course_id' });

Enrollment.sync();

export default Enrollment;
