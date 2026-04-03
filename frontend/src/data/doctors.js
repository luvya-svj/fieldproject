import { hospitalsData } from './hospitals_data';

// Extract all doctors from all hospitals
export const doctors = hospitalsData.flatMap(h =>
    h.doctors.map(d => ({
        id: d.id, // Ensure IDs are unique string or handle mapping
        name: d.name,
        specialization: d.specialization,
        qualification: d.title,
        experience: `${d.years_experience} years`,
        hospital: h.name,
        rating: d.rating,
        reviews: d.reviews_count,
        consultationFee: d.consultation_fee,
        procedures: d.previous_major_procedures?.map(p => ({
            name: p.name,
            cost: `₹${p.typical_cost}`
        })) || [],
        image: d.image || (d.name.includes("Priya") || d.name.includes("Anjali") || d.name.includes("Neha")
            ? "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=400"
            : "https://images.unsplash.com/photo-1622253692010-33162a63273e?auto=format&fit=crop&q=80&w=400&h=400")
    }))
);
