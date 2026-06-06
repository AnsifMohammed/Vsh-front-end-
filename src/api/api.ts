import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://vsh-backend-25m1.onrender.com/api"
});

export default api;
