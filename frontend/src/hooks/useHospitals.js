import { useState, useEffect, useMemo } from 'react';
import { hospitals as staticHospitals } from '../data/hospitals';
import { useUserLocation } from '../context/UserLocationContext';
import { calculateDistance, formatDistance } from '../utils/geoUtils';
import { fetchHospitals } from '../services/api';

export const useHospitals = () => {
    const { location } = useUserLocation();
    const [hospitals, setHospitals] = useState(staticHospitals);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const response = await fetchHospitals();
                if (response.success) {
                    // Map API response to match frontend data format (matching hospitals.js)
                    const mappedData = response.data.map(h => ({
                        ...h,
                        specialization: h.type,
                        rating: h.rating_overall,
                        waitingTime: h.estimated_average_wait_time_mins ? `${h.estimated_average_wait_time_mins} min` : 'N/A',
                        consultationFee: h.doctors?.[0]?.consultation_fee || 500,
                        insurance: h.insurance_accepted,
                        address: h.full_address,
                        image: h.photos?.[0]?.url || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400&h=300',
                        open247: h.open_24_7,
                    }));
                    setHospitals(mappedData);
                }
            } catch (err) {
                console.error("Failed to fetch hospitals from API, using static data", err);
                setError(err.message);
                // Fallback is already staticHospitals from initial state
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const enrichedHospitals = useMemo(() => {
        if (!location) return hospitals;

        return hospitals.map(h => {
            if (!h.geo) return h;
            const distanceValue = calculateDistance(
                location.lat,
                location.lon,
                h.geo.lat,
                h.geo.lon
            );
            return {
                ...h,
                distanceValue,
                distance: formatDistance(distanceValue)
            };
        });
    }, [hospitals, location]);

    return { hospitals: enrichedHospitals, loading, error };
};
