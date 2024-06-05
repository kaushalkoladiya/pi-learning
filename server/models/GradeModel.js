// GradesModel.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js'; // Ensure Sequelize is properly connected
import Submission from './SubmissionModel.js'; // Import the Submission model

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
      model: Submission,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Grade',
  tableName: 'grades'
});

// Relationship with Submission
Grade.belongsTo(Submission, { foreignKey: 'submissionId' });
Submission.hasOne(Grade, { foreignKey: 'submissionId' });

Grade.sync();

export default Grade;
