import axios from "axios";

export const axiosService = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

axiosService.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    // config.headers.Authorization = token;
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});
