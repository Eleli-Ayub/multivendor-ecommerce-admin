import axios from 'axios';

export const axiosService = axios.create({
    // baseURL: 'https://api.eduka.co.ke/',
    baseURL: 'http://localhost:8000',
    // baseURL: 'http://192.168.0.112:8000',
    // baseURL: 'http://137.184.189.199:8000',
});

// Add a response interceptor to handle errors
axiosService.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 400) {
            // Log the error response body
            console.error('Error Response Body:', error.response.data);
        }
        return Promise.reject(error);
    }
);

// Add a request interceptor
axiosService.interceptors.request.use(async (req) => {
    let token = localStorage.getItem('adminToken');
    if (token) {
        req.headers['x-access-token'] = token;
    }

    return req;
});
