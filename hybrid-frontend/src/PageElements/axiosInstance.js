import axios from 'axios';
import config from '../config/config'; // Importa la configuración global

const axiosInstance = axios.create({
  baseURL: config.API_BASE_URL, // Usa la URL base desde config.js
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
