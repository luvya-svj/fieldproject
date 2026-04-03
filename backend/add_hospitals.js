import 'dotenv/config';
import Hospital from './models/Hospital.js';

const newHospitals = [
    {
        id: "v1001",
        name: "Lilavati Hospital and Research Centre",
        type: "Multispeciality Hospital",
        neighborhood: "Bandra West",
        full_address: "A-791, Bandra Reclamation, Bandra West, Mumbai, Maharashtra 400050",
        geo: { lat: 19.0505, lon: 72.8277 },
        contact_phone: "+91 22 2675 1000",
        website: "https://www.lilavatihospital.com/",
        open_24_7: true,
        OPD_timings: "08:00 - 20:00 (Mon-Sat)",
        emergency: true,
        icu_beds: 70,
        total_beds: 323,
        specialities: ["Cardiology", "Neurology", "Gynaecology", "Pediatrics", "Oncology", "Orthopaedics", "Gastroenterology"],
        departments: ["Medicine", "Surgery", "Emergency", "Diagnostics", "ICU"],
        doctors: [
            { id: "dv100101", name: "Dr. Jalil Parkar", title: "Pulmonologist", specialization: "Pulmonology", years_experience: 30, consultation_fee: 2500, available_days: "Mon-Fri", available_times: "10:00-14:00", rating: 4.8, reviews_count: 500 }
        ],
        pharmacy24x7: true,
        insurance_accepted: ["HDFC ERGO", "Star Health", "ICICI Lombard", "Bajaj Allianz", "Aditya Birla"],
        estimated_average_wait_time_mins: 40,
        rating_overall: 4.6,
        photos: [],
        notes: "A premier multi-speciality hospital in Mumbai.",
        is_verified: true,
        is_highlighted: true
    },
    {
        id: "v1002",
        name: "Kokilaben Dhirubhai Ambani Hospital",
        type: "Multispeciality Hospital",
        neighborhood: "Andheri West",
        full_address: "Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Andheri West, Mumbai, Maharashtra 400053",
        geo: { lat: 19.1311, lon: 72.8252 },
        contact_phone: "+91 22 3099 9999",
        website: "https://www.kokilabenhospital.com/",
        open_24_7: true,
        OPD_timings: "08:00 - 20:00 (Mon-Sat)",
        emergency: true,
        icu_beds: 130,
        total_beds: 750,
        specialities: ["Robotic Surgery", "Cardiology", "Oncology", "Neurosciences", "Orthopaedics", "Pediatrics"],
        departments: ["Children's Heart Center", "Cancer Institute", "Robotic Institute", "Emergency"],
        doctors: [
            { id: "dv100201", name: "Dr. Santosh Shetty", title: "Orthopaedic Specialist", specialization: "Orthopaedics", years_experience: 25, consultation_fee: 2000, available_days: "Mon-Sat", available_times: "11:00-16:00", rating: 4.9, reviews_count: 650 }
        ],
        pharmacy24x7: true,
        insurance_accepted: ["HDFC ERGO", "Star Health", "ICICI Lombard", "Bajaj Allianz", "Aditya Birla", "Reliance General"],
        estimated_average_wait_time_mins: 35,
        rating_overall: 4.8,
        photos: [],
        notes: "One of the most advanced, state-of-the-art hospitals in India.",
        is_verified: true,
        is_highlighted: true
    },
    {
        id: "v1003",
        name: "Breach Candy Hospital",
        type: "Multispeciality Hospital",
        neighborhood: "Breach Candy",
        full_address: "60 A, Bhulabhai Desai Road, Breach Candy, Mumbai, Maharashtra 400026",
        geo: { lat: 18.9715, lon: 72.8055 },
        contact_phone: "+91 22 2367 1866",
        website: "https://www.breachcandyhospital.org/",
        open_24_7: true,
        OPD_timings: "10:00 - 18:00 (Mon-Sat)",
        emergency: true,
        icu_beds: 40,
        total_beds: 212,
        specialities: ["Cardiology", "General Surgery", "Oncology", "Orthopaedics", "Nephrology"],
        departments: ["Surgery", "Medicine", "Critical Care"],
        doctors: [
            { id: "dv100301", name: "Dr. Farokh Udwadia", title: "General Physician", specialization: "General Medicine", years_experience: 40, consultation_fee: 3000, available_days: "Mon-Thu", available_times: "10:00-13:00", rating: 4.9, reviews_count: 400 }
        ],
        pharmacy24x7: true,
        insurance_accepted: ["Star Health", "ICICI Lombard", "HDFC ERGO"],
        estimated_average_wait_time_mins: 25,
        rating_overall: 4.7,
        photos: [],
        notes: "Renowned heritage hospital located in South Mumbai.",
        is_verified: true,
        is_highlighted: true
    },
    {
        id: "v1004",
        name: "P. D. Hinduja National Hospital",
        type: "Multispeciality Hospital",
        neighborhood: "Mahim West",
        full_address: "Veer Savarkar Marg, Mahim West, Mumbai, Maharashtra 400016",
        geo: { lat: 19.0345, lon: 72.8390 },
        contact_phone: "+91 22 2444 9199",
        website: "https://www.hindujahospital.com/",
        open_24_7: true,
        OPD_timings: "08:00 - 20:00 (Mon-Sat)",
        emergency: true,
        icu_beds: 60,
        total_beds: 400,
        specialities: ["Neurology", "Cardiology", "Oncology", "Pulmonology", "Endocrinology", "Gastroenterology"],
        departments: ["Neurology", "Cardiology", "Oncology", "Emergency", "ICU"],
        doctors: [
            { id: "dv100401", name: "Dr. Milind Nadkar", title: "General Physician", specialization: "General Medicine", years_experience: 30, consultation_fee: 2000, available_days: "Mon-Sat", available_times: "09:00-15:00", rating: 4.8, reviews_count: 550 }
        ],
        pharmacy24x7: true,
        insurance_accepted: ["HDFC ERGO", "Star Health", "Care Health", "Bajaj Allianz"],
        estimated_average_wait_time_mins: 45,
        rating_overall: 4.6,
        photos: [],
        notes: "Award-winning quaternary care hospital.",
        is_verified: true,
        is_highlighted: true
    },
    {
        id: "v1005",
        name: "Dr. L. H. Hiranandani Hospital",
        type: "Multispeciality Hospital",
        neighborhood: "Powai",
        full_address: "Hillside Avenue, Hiranandani Gardens, Powai, Mumbai, Maharashtra 400076",
        geo: { lat: 19.1174, lon: 72.9096 },
        contact_phone: "+91 22 2576 3333",
        website: "https://www.hiranandanihospital.org/",
        open_24_7: true,
        OPD_timings: "08:00 - 20:00 (Mon-Sat)",
        emergency: true,
        icu_beds: 50,
        total_beds: 240,
        specialities: ["Cardiology", "Orthopaedics", "Gynaecology", "Neurology", "Oncology", "General Surgery"],
        departments: ["Cardiology", "Orthopaedics", "Neurology", "Emergency"],
        doctors: [
            { id: "dv100501", name: "Dr. Sanjeev Jadhav", title: "Cardio Thoracic Surgeon", specialization: "Cardiology", years_experience: 25, consultation_fee: 1800, available_days: "Mon-Fri", available_times: "10:00-14:00", rating: 4.7, reviews_count: 320 }
        ],
        pharmacy24x7: true,
        insurance_accepted: ["HDFC ERGO", "ICICI Lombard", "Aditya Birla", "Star Health"],
        estimated_average_wait_time_mins: 30,
        rating_overall: 4.5,
        photos: [],
        notes: "Located in the heart of Powai, major referral center for central line suburbs.",
        is_verified: true,
        is_highlighted: true
    },
    {
        id: "v1006",
        name: "Nanavati Max Super Speciality Hospital",
        type: "Multispeciality Hospital",
        neighborhood: "Vile Parle West",
        full_address: "SV Rd, LIC Colony, Suresh Colony, Vile Parle West, Mumbai, Maharashtra 400056",
        geo: { lat: 19.0970, lon: 72.8398 },
        contact_phone: "+91 22 2626 7000",
        website: "https://www.nanavatimaxhospital.org/",
        open_24_7: true,
        OPD_timings: "08:00 - 20:00 (Mon-Sat)",
        emergency: true,
        icu_beds: 75,
        total_beds: 350,
        specialities: ["Cardiology", "Neurology", "Orthopaedics", "Gastroenterology", "Oncology", "Organ Transplants"],
        departments: ["Transplant", "Neurosciences", "Cardiac Sciences", "Emergency"],
        doctors: [
            { id: "dv100601", name: "Dr. Brian Pinto", title: "Cardiologist", specialization: "Cardiology", years_experience: 35, consultation_fee: 2500, available_days: "Mon-Sat", available_times: "11:00-15:00", rating: 4.9, reviews_count: 700 }
        ],
        pharmacy24x7: true,
        insurance_accepted: ["HDFC ERGO", "Star Health", "ICICI Lombard", "Max Bupa"],
        estimated_average_wait_time_mins: 40,
        rating_overall: 4.6,
        photos: [],
        notes: "Heritage hospital now upgraded to a Max Super Speciality facility.",
        is_verified: true,
        is_highlighted: true
    },
    {
        id: "v1007",
        name: "Tata Memorial Hospital",
        type: "Speciality Hospital (Oncology)",
        neighborhood: "Parel",
        full_address: "Dr Ernest Borges Rd, Parel, Mumbai, Maharashtra 400012",
        geo: { lat: 19.0049, lon: 72.8436 },
        contact_phone: "+91 22 2417 7000",
        website: "https://tmc.gov.in/",
        open_24_7: true,
        OPD_timings: "08:00 - 17:00 (Mon-Sat)",
        emergency: true,
        icu_beds: 60,
        total_beds: 629,
        specialities: ["Surgical Oncology", "Medical Oncology", "Radiation Oncology", "Pediatric Oncology"],
        departments: ["Oncology", "Radiotherapy", "ICU", "Pathology"],
        doctors: [
            { id: "dv100701", name: "Dr. Shripad Banavali", title: "Medical Oncologist", specialization: "Oncology", years_experience: 35, consultation_fee: 500, available_days: "Mon-Fri", available_times: "09:00-14:00", rating: 4.9, reviews_count: 1200 }
        ],
        pharmacy24x7: true,
        insurance_accepted: ["CGHS", "TPA", "Various Government Schemes"],
        estimated_average_wait_time_mins: 120, // High wait times due to volume
        rating_overall: 4.8,
        photos: [],
        notes: "India's leading cancer treatment and research center.",
        is_verified: true,
        is_highlighted: true
    },
    {
        id: "v1008",
        name: "Jaslok Hospital",
        type: "Multispeciality Hospital",
        neighborhood: "Pedder Road",
        full_address: "15, Dr Deshmukh Marg, Pedder Road, Mumbai, Maharashtra 400026",
        geo: { lat: 18.9723, lon: 72.8093 },
        contact_phone: "+91 22 6657 3333",
        website: "https://www.jaslokhospital.net/",
        open_24_7: true,
        OPD_timings: "08:00 - 20:00 (Mon-Sat)",
        emergency: true,
        icu_beds: 55,
        total_beds: 350,
        specialities: ["Cardiology", "Neurology", "Gastroenterology", "Organ Transplant", "Oncology"],
        departments: ["Cardiology", "Neurology", "Transplant", "Emergency"],
        doctors: [
            { id: "dv100801", name: "Dr. A.B. Mehta", title: "Cardiologist", specialization: "Cardiology", years_experience: 40, consultation_fee: 2500, available_days: "Mon-Sat", available_times: "10:00-14:00", rating: 4.8, reviews_count: 350 }
        ],
        pharmacy24x7: true,
        insurance_accepted: ["HDFC ERGO", "Star Health", "ICICI Lombard", "Bajaj Allianz"],
        estimated_average_wait_time_mins: 35,
        rating_overall: 4.6,
        photos: [],
        notes: "One of the oldest tertiary care private hospitals in the country.",
        is_verified: true,
        is_highlighted: true
    },
    {
        id: "v1009",
        name: "Sir H. N. Reliance Foundation Hospital",
        type: "Multispeciality Hospital",
        neighborhood: "Girgaon",
        full_address: "Prarthana Samaj, Raja Rammohan Roy Rd, Girgaon, Mumbai, Maharashtra 400004",
        geo: { lat: 18.9566, lon: 72.8184 },
        contact_phone: "+91 22 6130 5000",
        website: "https://www.rfhospital.org/",
        open_24_7: true,
        OPD_timings: "08:00 - 20:00 (Mon-Sat)",
        emergency: true,
        icu_beds: 70,
        total_beds: 345,
        specialities: ["Cardiology", "Oncology", "Neurology", "Robotic Surgery", "Orthopaedics", "Gastroenterology"],
        departments: ["Robotic Institute", "Cardiac Sciences", "Neurosciences", "Emergency"],
        doctors: [
            { id: "dv100901", name: "Dr. Tarang Gianchandani", title: "CEO / Doctor", specialization: "General Medicine", years_experience: 25, consultation_fee: 2000, available_days: "Mon-Fri", available_times: "11:00-14:00", rating: 4.9, reviews_count: 200 }
        ],
        pharmacy24x7: true,
        insurance_accepted: ["HDFC ERGO", "Reliance General", "ICICI Lombard", "Star Health"],
        estimated_average_wait_time_mins: 20,
        rating_overall: 4.9,
        photos: [],
        notes: "Extremely advanced facility backed by the Reliance Foundation.",
        is_verified: true,
        is_highlighted: true
    },
    {
        id: "v1010",
        name: "Bombay Hospital and Medical Research Centre",
        type: "Multispeciality Hospital",
        neighborhood: "Marine Lines",
        full_address: "12, Vitthaldas Thackersey Marg, near to Liberty Cinema, New Marine Lines, Marine Lines, Mumbai, Maharashtra 400020",
        geo: { lat: 18.9406, lon: 72.8276 },
        contact_phone: "+91 22 2206 7676",
        website: "https://www.bombayhospital.com/",
        open_24_7: true,
        OPD_timings: "08:00 - 18:00 (Mon-Sat)",
        emergency: true,
        icu_beds: 140,
        total_beds: 725,
        specialities: ["Neurosurgery", "Orthopaedics", "General Medicine", "Cardiology", "Urology", "Pediatrics"],
        departments: ["Neurosurgery", "Cardiology", "Orthopaedics", "Emergency"],
        doctors: [
            { id: "dv101001", name: "Dr. K.E. Turel", title: "Neurosurgeon", specialization: "Neurosurgery", years_experience: 45, consultation_fee: 3000, available_days: "Mon, Wed, Fri", available_times: "10:00-14:00", rating: 4.8, reviews_count: 500 }
        ],
        pharmacy24x7: true,
        insurance_accepted: ["Star Health", "ICICI Lombard", "Bajaj Allianz"],
        estimated_average_wait_time_mins: 40,
        rating_overall: 4.5,
        photos: [],
        notes: "Historic charity and private hospital serving Mumbai for decades.",
        is_verified: true,
        is_highlighted: true
    }
];

const seedNew = async () => {
    try {
        console.log(`Starting to add ${newHospitals.length} top Mumbai hospitals...`);
        const sanitized = newHospitals.map(h => {
             const ht = {...h};
             ['specialities', 'departments', 'insurance_accepted'].forEach(field => {
                 if (ht[field] && !Array.isArray(ht[field])) {
                     ht[field] = [String(ht[field])];
                 } else if (!ht[field]) {
                     ht[field] = [];
                 }
             });
             return ht;
        });
        
        for (const data of sanitized) {
            await Hospital.upsert(data);
        }
        console.log('SUCCESS: Inserted all new hospitals to DB.');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

seedNew();
