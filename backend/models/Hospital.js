import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Hospital = sequelize.define('Hospital', {
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
  type: {
    type: DataTypes.STRING,
  },
  neighborhood: {
    type: DataTypes.STRING,
  },
  full_address: {
    type: DataTypes.TEXT,
  },
  geo: {
    type: DataTypes.JSONB, // Stores { lat: X, lon: Y }
  },
  contact_phone: {
    type: DataTypes.STRING,
  },
  contact_email: {
    type: DataTypes.STRING,
  },
  website: {
    type: DataTypes.STRING,
  },
  open_24_7: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  OPD_timings: {
    type: DataTypes.STRING,
  },
  emergency: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  icu_beds: {
    type: DataTypes.INTEGER,
  },
  total_beds: {
    type: DataTypes.INTEGER,
  },
  specialities: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  departments: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  doctors: {
    type: DataTypes.JSONB, // Array of doctor objects
  },
  pharmacy24x7: {
    type: DataTypes.BOOLEAN,
  },
  pharmacy_name: {
    type: DataTypes.STRING,
  },
  medicine_query_endpoint: {
    type: DataTypes.BOOLEAN,
  },
  insurance_accepted: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  rating_overall: {
    type: DataTypes.FLOAT,
  },
  photos: {
    type: DataTypes.JSONB, // Array of photo objects
  },
  notes: {
    type: DataTypes.TEXT,
  },
  last_updated: {
    type: DataTypes.DATE,
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_highlighted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  estimated_average_wait_time_mins: {
    type: DataTypes.INTEGER,
  },
  queue_length: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  tableName: 'hospitals',
  timestamps: true,
  underscored: true
});

export default Hospital;
