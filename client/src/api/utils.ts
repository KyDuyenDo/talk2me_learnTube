
import axios from "axios";
import { useUserStore } from "../store/useUserStore";

const baseURL = "/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
  },
});

const apiLogin = axios.create({
  baseURL,
});

// Request Interceptor -> luôn attach token vào header
api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor


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
    const { setLogout } = useUserStore.getState();

    const errorMessage =
      error?.response?.data?.message || error.message || "Có lỗi xảy ra";

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url.includes("/user/refresh")) {
        setLogout();
        window.location.href = "/login";
        return Promise.reject(new Error(errorMessage));
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => {
            const msg =
              err?.response?.data?.message || err.message || "Có lỗi xảy ra";
            return Promise.reject(new Error(msg));
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.get("/user/refresh");
        const newToken = res.data.accessToken;

        useUserStore.setState({ accessToken: newToken });
        api.defaults.headers.common["Authorization"] = "Bearer " + newToken;

        processQueue(null, newToken);

        originalRequest.headers["Authorization"] = "Bearer " + newToken;
        return api(originalRequest);
      } catch (err: any) {
        const msg =
          err?.response?.data?.message || err.message || "Có lỗi xảy ra";
        processQueue(err, null);
        setLogout();
        window.location.href = "/login";
        return Promise.reject(new Error(msg));
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 403) {
      setLogout();
      window.location.href = "/login";
    }

    return Promise.reject(new Error(errorMessage));
  }
);


const handleApiError = async (error: any) => {
  try {
    const msg = error?.response?.data?.message || error.message || "Có lỗi xảy ra";
    return Promise.reject(new Error(msg));
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};

export { api, apiLogin, handleApiError };
