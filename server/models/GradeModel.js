import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js'; 
import Submission from './SubmissionModel.js'; 

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


Grade.belongsTo(Submission, { foreignKey: 'submissionId' });
Submission.hasOne(Grade, { foreignKey: 'submissionId' });

Grade.sync();

export default Grade;
