import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: 'https://wash-wave-server.vercel.app'
  baseURL: "http://localhost:8001",
});

export default axiosInstance;
