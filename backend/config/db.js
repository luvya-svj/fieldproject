import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // Set to true if you want to see SQL queries
    define: {
      timestamps: true, // Auto-adds createdAt and updatedAt
      underscored: true, // snake_case instead of camelCase for columns
    },
  }
);

export const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Connected via Sequelize');
    } catch (err) {
        console.error('Unable to connect to the database:', err.message);
    }
};

export default sequelize;
