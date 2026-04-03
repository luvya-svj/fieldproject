import { hospitalsData } from './hospitals_data';

// Map the detailed data to the format expected by the frontend listings
export const hospitals = hospitalsData.map(h => ({
  id: h.id,
  name: h.name,
  type: h.type,
  specialization: h.type, // Map type to specialization for ListingCard
  distance: "2.5 km", // Synthetic distance for now, or calculate
  rating: h.rating_overall,
  waitingTime: `${h.estimated_average_wait_time_mins} min`,
  consultationFee: h.doctors?.[0]?.consultation_fee || 500, // Use first doctor's fee as proxy
  insurance: h.insurance_accepted,
  neighborhood: h.neighborhood,
  specialties: h.specialities,
  address: h.full_address,
  image: h.photos?.[0]?.url,
  open247: h.open_24_7,
  doctors: h.doctors,
  isVerified: h.is_verified,
  isHighlighted: h.is_highlighted,
  geo: h.geo
})).sort((a, b) => (b.isHighlighted ? 1 : 0) - (a.isHighlighted ? 1 : 0));
