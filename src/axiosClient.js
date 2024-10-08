import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api'
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) { // Verifica si error.response existe
            const { response } = error;
            if (response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
            }
        } else {
            console.error('Error sin respuesta:', error);
        }
        throw error;
    }
);

export default axiosClient;
