import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import hospitalsRoute from './routes/hospitals.js';
import sequelize from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/hospitals', hospitalsRoute);

// Basic Health Check
app.get('/', (req, res) => {
  res.send('MediMap API is running with PostgreSQL integration...');
});

// Sync Database & Start Server
const startServer = async () => {
    try {
        // Only sync if database exists. Otherwise it might error.
        await sequelize.authenticate();
        console.log('Database Connected Successfully');
        
        // Use { alter: true } sparingly in production, but okay for dev
        await sequelize.sync({ alter: true });
        console.log('Models Synchronized');

        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Database Connection Error:', err.message);
        // Start server anyway even if DB is not connected to see mock data? 
        // No, let's fix it.
         app.listen(PORT, () => {
          console.log(`Server running on port ${PORT} (Warning: DB disconnected)`);
        });
    }
};

startServer();
