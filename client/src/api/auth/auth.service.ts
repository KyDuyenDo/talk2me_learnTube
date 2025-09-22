import { api, handleApiError } from "../../utils/utils";


export async function loginUser(formData: FormData) {
    const response = await api.post('api/user/signin', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return { error: null, data: response.data };
}

export async function registerUser(formData: FormData) {
    try {
        const response = await api.post('/api/user/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return { error: null, data: response.data };
    } catch (error) {
        return await handleApiError(error);
    }
}

export async function refreshToken() {
    try {
        const response = await api.post('/api/user/refresh', {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return { error: null, data: response.data };
    } catch (error) {
        return await handleApiError(error);
    }
}

