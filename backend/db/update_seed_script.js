import fs from 'fs';
import path from 'path';

const dataPath = path.join('..', 'tmp', 'pharmacies_data.json');
const seedPath = path.join('seed_pharmacies.js');

try {
    console.log('Reading data from:', dataPath);
    const buf = fs.readFileSync(dataPath);
    const contentStr = buf.toString('utf16le');
    const data = JSON.parse(contentStr.replace(/^\uFEFF/, ''));
    
    console.log('Generating seed script content...');
    const seedContent = `import 'dotenv/config';
import sequelize from '../config/db.js';
import Pharmacy from '../models/Pharmacy.js';

const pharmaciesData = ${JSON.stringify(data, null, 2)};

const seedPharmacies = async () => {
    try {
        console.log('Connecting to database...');
        await sequelize.authenticate();
        
        console.log('Syncing Pharmacy model...');
        await sequelize.sync({ alter: true });
        
        console.log('Clearing existing pharmacies...');
        await Pharmacy.destroy({ where: {} });
        
        console.log('Inserting ${data.length} records...');
        await Pharmacy.bulkCreate(pharmaciesData);

        console.log('Pharmacies seeded successfully! 🌱💊');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding pharmacy DB:', error);
        process.exit(1);
    }
};

seedPharmacies();
`;

    console.log('Writing to:', seedPath);
    fs.writeFileSync(seedPath, seedContent);
    console.log('Update complete!');
} catch (err) {
    console.error('Error during update:', err);
    process.exit(1);
}
