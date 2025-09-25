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
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url.includes("/api/user/refresh")) {
        // nếu refresh cũng 401 => logout luôn
        useUserStore.setState({ accessToken: null });
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // đợi refresh xong rồi retry lại request
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.get("/api/user/refresh");
        const newToken = res.data.accessToken;

        useUserStore.setState({ accessToken: newToken });
        api.defaults.headers.common["Authorization"] = "Bearer " + newToken;

        processQueue(null, newToken);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        useUserStore.setState({ accessToken: null });
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 403) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export { api };
