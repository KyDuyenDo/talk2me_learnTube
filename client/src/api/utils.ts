import axios from 'axios'

const baseURL = 'http://localhost:8000';

const authInterceptor = (req: any) => {
    //const token = JSON.parse(localStorage.getItem('profile') || "")?.accessToken;
    // if (token) {
    // }
    req.headers['Authorization'] = `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2JjMTgxMjFlMmFiMjgxY2NkZDdiNSIsImVtYWlsIjoiZHV5ZW5rMjAwQGdtYWlsLmNvbSIsImlhdCI6MTc1ODYwOTU5OSwiZXhwIjoxNzU4NjMxMTk5fQ.Z03RsyvxdTe8u5NBRB_fw3BggT0d54CE6_-xA146dp4'}`;
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
