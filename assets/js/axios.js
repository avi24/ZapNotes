import axios from 'axios';

// Create an instance of Axios
const api = axios.create({
    baseURL: 'http://your-api-url.com', // Replace with your API base URL
    timeout: 1000,
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        // Add the JWT token to request headers
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        // Handle successful response
        return response;
    },
    (error) => {
        // Handle response error
        if (error.response && error.response.status === 401) {
            // Handle unauthorized errors, such as redirecting to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
