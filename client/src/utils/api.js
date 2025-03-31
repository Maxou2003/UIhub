import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/',
    timeout: 10000
});

// Add request interceptor
api.interceptors.request.use(config => {
    const tokenItem = localStorage.getItem('key');
    if (tokenItem) {
        try {
            const token = JSON.parse(tokenItem)?.value;
            if (token) {
                config.headers.Authorization = `${token}`;
            }
        } catch (e) {
            console.error('Error parsing token:', e);
        }
    }
    return config;
});

export default api;