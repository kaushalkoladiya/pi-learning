import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import { DATABASE_TABLES } from '../constants/tables.js';

class Country extends Model {}

Country.init({
  code: {
    type: DataTypes.STRING(5),
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
}, {
  sequelize: sequelize,
  modelName: DATABASE_TABLES.COUNTRY,
  timestamps: false
});

Country.sync();
export default Country;
