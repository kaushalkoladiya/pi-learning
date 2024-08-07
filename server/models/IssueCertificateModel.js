import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import User from './userModel.js';
import Certificate from './CertificateModel.js';

class IssuedCertificate extends Model {}

IssuedCertificate.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  certificateId: {
    type: DataTypes.INTEGER,
    references: {
      model: Certificate,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  issueDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'IssuedCertificate',
  tableName: 'issued_certificates',
  timestamps: true,
});


IssuedCertificate.belongsTo(Certificate, { foreignKey: 'certificateId' });
Certificate.hasMany(IssuedCertificate, { foreignKey: 'certificateId' });

IssuedCertificate.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(IssuedCertificate, { foreignKey: 'userId' });

IssuedCertificate.sync();

export default IssuedCertificate;
