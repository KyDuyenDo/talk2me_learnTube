import axios from 'axios'

const baseURL = 'http://localhost:8000';

const authInterceptor = (req: any) => {
    //const token = JSON.parse(localStorage.getItem('profile') || "")?.accessToken;
    // if (token) {
    // }
    req.headers['Authorization'] = `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2JjMTgxMjFlMmFiMjgxY2NkZDdiNSIsImVtYWlsIjoiZHV5ZW5rMjAwQGdtYWlsLmNvbSIsImlhdCI6MTc1ODg0ODAzNywiZXhwIjoxNzU4ODY5NjM3fQ.CC4nKgvRVe-v-XX8BsvxRXlV_t88oTViQo0IC44LJ2Y'}`;
    return req;
}

export const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
    }
})

api.interceptors.request.use(authInterceptor)

export const handleApiError = async (error: any) => {
    try {
        const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
        const data = null;
        return { error: errorMessage, data };
    } catch (err) {
        throw new Error("An unexpected error occurred.");
    }
};
