import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

// Add Authorization header globally
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(token);
  }
  return config;
});

export default api;
