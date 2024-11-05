import axios from 'axios';
import {NGROK_URL} from '@env';

const axiosInstance = axios.create({
  baseURL: `https://50ac-190-164-206-237.ngrok-free.app/api/v1`, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
