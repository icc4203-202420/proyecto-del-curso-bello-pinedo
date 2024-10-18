import axios from 'axios';
import { NGROK_URL } from '@env';

const axiosInstance = axios.create({
  baseURL: NGROK_URL,  // Cambia '192.168.0.25' por la IP local de tu servidor Rails
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
