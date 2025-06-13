// services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://your-backend-api.com", 
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
