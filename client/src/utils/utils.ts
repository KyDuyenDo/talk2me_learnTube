import axios from 'axios'

const baseURL = 'http://localhost:8000';

const authInterceptor = (req:any) => {
    const token = JSON.parse(localStorage.getItem('profile') || "")?.accessToken;
    if (token) {
        req.headers['Authorization'] = `Bearer ${token}`;
    }
    return req;
}

export const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
    }
})

api.interceptors.response.use(authInterceptor)

export const handleApiError = async (error: any) => {
    try {
        const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
        const data = null;
        return { error: errorMessage, data };
    } catch (err) {
        throw new Error("An unexpected error occurred.");
    }
};