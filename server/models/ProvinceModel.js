import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import { DATABASE_TABLES } from '../constants/tables.js';

class Province extends Model {}

Province.init({
  code: {
    type: DataTypes.STRING(2),
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
}, {
  sequelize: sequelize,
  modelName: DATABASE_TABLES.PROVINCE,
  timestamps: false
});

Province.sync();
export default Province;
