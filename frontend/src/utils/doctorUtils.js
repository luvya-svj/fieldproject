import { verified } from '../data/hospitals_verified';

// Generate deterministic but realistic-looking contact info from doctor ID
const generatePhone = (id) => {
    const seed = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const prefixes = ['98', '91', '90', '99', '97', '96', '95', '93', '87', '86', '82', '80', '77', '70'];
    const prefix = prefixes[seed % prefixes.length];
    const num = String((seed * 73193) % 100000000).padStart(8, '0');
    return `+91-${prefix}${num.slice(0, 4)}-${num.slice(4, 8)}`;
};

const generateEmail = (name, id) => {
    const seed = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const domains = ['medimap.in', 'doccare.in', 'healthhub.co.in', 'clinicpro.in', 'drconsult.in'];
    const domain = domains[seed % domains.length];
    const cleanName = name
        .replace(/Dr\.\s*/i, '')
        .toLowerCase()
        .replace(/\s+/g, '.')
        .replace(/[^a-z.]/g, '');
    return `${cleanName}@${domain}`;
};

// Extract all doctors from all hospitals, augmenting with hospital info
export const getAllDoctors = () => {
    const doctors = [];
    verified.forEach(hospital => {
        if (hospital.doctors && Array.isArray(hospital.doctors)) {
            hospital.doctors.forEach(doc => {
                doctors.push({
                    ...doc,
                    hospitalName: hospital.name,
                    hospitalId: hospital.id,
                    hospitalAddress: hospital.full_address,
                    hospitalNeighborhood: hospital.neighborhood,
                    phone: generatePhone(doc.id),
                    email: generateEmail(doc.name, doc.id),
                    // Normalise fields
                    rating: doc.rating || 4.5,
                    consultation_fee: doc.consultation_fee || 1500,
                });
            });
        }
    });
    return doctors;
};

export const getDoctorById = (id) => {
    return getAllDoctors().find(d => String(d.id) === String(id));
};
