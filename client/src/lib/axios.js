import axios from "axios";
import { toast } from "sonner";
import useUserStore from "../stores/useUserStore.js";
import CollectorStore from "../stores/collectorStore.js";
import CentreStore from "../stores/centreStore.js";

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
    console.log(error.response);
    // If backend sent a message
    const message = error?.response?.data?.message || "Something went wrong";

    toast.error(message);

    // 401 -> Unauthorized -> redirect to login
    if (error?.response?.status === 401) {
      useUserStore.getState().clearUser();
      CollectorStore.getState().clearCollector();
      CentreStore.getState().clearCentre();

      localStorage.clear();

      if (window.location.pathname !== "/login") {
        //// if path is login then not redirect
        window.history.replaceState(null, "", "/login"); //// Changes the URL to /login WITHOUT reloading the page
        window.dispatchEvent(new PopStateEvent("popstate")); //// Manually tells React Router: “Hey, the URL changed!”
      }
    }

    return Promise.reject(error);
  }
);

export default api;
