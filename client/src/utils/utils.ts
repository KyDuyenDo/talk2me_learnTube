// api/axiosClient.ts
import axios from "axios";

const baseURL = 'http://localhost:8000';

// interceptor cho request → gắn token
const authInterceptor = (req: any) => {
    const token = localStorage.getItem("accessToken"); // hoặc lấy từ Zustand nếu muốn
    if (token) {
        req.headers = {
            ...req.headers,
            Authorization: `Bearer ${token}`,
        };
    }
    return req;
};

// khởi tạo axios instance
export const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
    },
});

// request interceptor (✅ đúng chỗ)
api.interceptors.request.use(authInterceptor);

// error handler helper
export const handleApiError = (error: any) => {
    const errorMessage =
        (error.response?.data as any)?.message || "An unexpected error occurred.";
    return { error: errorMessage, data: null };
};
