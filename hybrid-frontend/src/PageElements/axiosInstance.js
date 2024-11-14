import axios from 'axios';
import {NGROK_URL} from '@env';

const axiosInstance = axios.create({
  baseURL: `https://b091-181-42-46-50.ngrok-free.app/api/v1`, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
