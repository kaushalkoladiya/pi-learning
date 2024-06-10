import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js'; 
import Assignment from './AssignmentModel.js';
import User from './userModel.js';  
class Submission extends Model {}

Submission.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fileLink: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  submissionDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  assignmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Assignment,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Submission',
  tableName: 'submissions'
});



Submission.belongsTo(Assignment, { foreignKey: 'assignmentId' });
Assignment.hasMany(Submission, { foreignKey: 'assignmentId' });

Submission.belongsTo(User, { as: 'Student', foreignKey: 'userId' });
User.hasMany(Submission, { foreignKey: 'userId' });

Submission.sync();

export default Submission;
