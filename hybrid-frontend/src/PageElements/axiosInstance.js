import axios from 'axios';
import {NGROK_URL} from '@env';

const axiosInstance = axios.create({
  baseURL: `https://e3dc-200-124-48-32.ngrok-free.app/api/v1`,  // Cambia '192.168.0.25' por la IP local de tu servidor Rails
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
