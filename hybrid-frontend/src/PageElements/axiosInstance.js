import axios from 'axios';
import {NGROK_URL} from '@env';

const axiosInstance = axios.create({
  baseURL: `https://8010-200-124-48-32.ngrok-free.app/api/v1`, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
