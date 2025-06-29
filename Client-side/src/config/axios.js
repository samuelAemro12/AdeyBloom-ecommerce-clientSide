import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // No need to manually add token since we're using HTTP-only cookies
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle authentication errors
        if (error.response?.status === 401) {
            // Redirect to login
            window.location.href = '/signin';
        }
        
        // Handle other errors
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response Error:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request Error:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api; 