import axios from "axios";
import { useUserStore } from "../store/useUserStore";

const baseURL = "http://localhost:8000";

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
  },
});

// Request Interceptor -> luôn attach token vào header
api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor -> auto refresh nếu 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await api.get("/api/user/refresh"); // gọi refresh endpoint
        const newToken = res.data.accessToken;

        // lưu vào zustand
        useUserStore.setState({ accessToken: newToken });

        // gắn lại token mới vào request cũ
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest); // retry lại request cũ
      } catch (err) {
        // refresh fail -> logout
        useUserStore.setState({ accessToken: null });
        window.location.href = "/login";
      }
    }

    if (error.response?.status === 403) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export { api };
