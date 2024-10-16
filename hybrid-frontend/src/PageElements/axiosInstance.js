import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://9ff0-190-164-206-237.ngrok-free.app/api/v1',  // Cambia '192.168.0.25' por la IP local de tu servidor Rails
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
