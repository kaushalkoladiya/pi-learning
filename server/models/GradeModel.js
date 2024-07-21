import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js'; 
import AssignmentSubmission from './AssignmentSubmissionModel.js';

class Grade extends Model {}

Grade.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  grade: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  submissionId: {
    type: DataTypes.INTEGER,
    references: {
      model: AssignmentSubmission,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Grade',
  tableName: 'grades'
});


Grade.belongsTo(AssignmentSubmission, { foreignKey: 'submissionId' });
AssignmentSubmission.hasOne(Grade, { foreignKey: 'submissionId' });

Grade.sync();

export default Grade;
