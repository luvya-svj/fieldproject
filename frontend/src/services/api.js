import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // Uses VITE_API_BASE_URL in production, fallback to proxy in dev
});

export const fetchHospitals = async (params) => {
    try {
        const response = await api.get('/hospitals', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        throw error;
    }
};

export const fetchHospitalById = async (id) => {
    try {
        const response = await api.get(`/hospitals/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching hospital ${id}:`, error);
        throw error;
    }
};

export default api;
