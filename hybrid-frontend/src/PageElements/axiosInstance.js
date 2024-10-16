import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.25:3000/api/v1',  // Cambia '192.168.0.25' por la IP local de tu servidor Rails
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
