import axios from "axios";
import { toast } from "sonner";
import useUserStore from "../stores/useUserStore.js";

const baseURL =
  import.meta.env.VITE_API_BACKEND_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ---- REQUEST INTERCEPTOR ----
api.interceptors.request.use(
  (config) => {
    return config; // nothing added for now
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ---- RESPONSE INTERCEPTOR ----
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend sent a message
    const message = error?.response?.data?.message || "Something went wrong";

    toast.error(message);

    // 401 -> Unauthorized -> redirect to login
    if (error?.response?.status === 401) {
      useUserStore.getState().clearUser();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
