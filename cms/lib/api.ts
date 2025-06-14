import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://backend-shape-explorer.vercel.app/",
});

export default api;
