import axios from 'axios';
const baseUrl = '/api/notes';

const axiosPrivate = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

export default axiosPrivate;