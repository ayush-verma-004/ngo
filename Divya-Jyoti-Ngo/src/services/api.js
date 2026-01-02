import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: import.meta.env.MODE === 'production'
        ? '/api'
        : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api'),
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'Something went wrong';

        // Don't show toast for 401 on login page
        if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
            localStorage.removeItem('token');
            // Notification or redirect could happen here
        } else {
            toast.error(message);
        }

        return Promise.reject(error);
    }
);

export default api;
