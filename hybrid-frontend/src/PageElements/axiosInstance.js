import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `https://7843-190-164-206-237.ngrok-free.app/api/v1`, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
