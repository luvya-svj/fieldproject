import 'dotenv/config';
import sequelize from '../config/db.js';
import Hospital from '../models/Hospital.js';
import { verified } from '../data/hospitals_verified.js';

const seedDatabase = async () => {
  try {
    console.log('Connecting to PostgreSQL for seeding...');
    await sequelize.authenticate();
    
    console.log('Force syncing database (REMOVING OLD DATA)...');
    await sequelize.sync({ force: true });
    
    console.log(`Preparing to seed ${verified.length} hospitals...`);
    
    // Sanitize data (ensure arrays are arrays)
    const sanitizedHospitals = verified.map(hospital => {
        const h = { ...hospital };
        // Ensure array fields are actually arrays
        ['specialities', 'departments', 'insurance_accepted'].forEach(field => {
            if (h[field] && !Array.isArray(h[field])) {
                h[field] = [String(h[field])];
            } else if (!h[field]) {
                h[field] = [];
            }
        });
        return h;
    });

    // Bulk create hospitals
    await Hospital.bulkCreate(sanitizedHospitals);
    
    console.log('PostgreSQL Seeding SUCCESS!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding ERROR:', err);
    process.exit(1);
  }
};

seedDatabase();
