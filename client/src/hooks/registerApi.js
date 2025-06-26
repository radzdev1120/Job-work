import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
} 