import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Pharmacy = sequelize.define('Pharmacy', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  neighborhood: {
    type: DataTypes.STRING,
  },
  full_address: {
    type: DataTypes.TEXT,
  },
  contact_phone: {
    type: DataTypes.STRING,
  },
  open_24_7: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  home_delivery: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  rating: {
    type: DataTypes.FLOAT,
  }
}, {
  tableName: 'pharmacies',
  timestamps: true,
  underscored: true
});

export default Pharmacy;
