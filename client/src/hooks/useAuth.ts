import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getInforUser, loginUser, logout, registerUser } from '../features/auth/api/auth.service'
import { useUserStore } from '../store/useUserStore'

type LoginInput = FormData

type LoginResponse = {
    error: string | null;
    data: {
        accessToken: string | null
    };
} | undefined | null



export function useLogin() {
    const { setAccessToken, redirectPath, setRedirectPath } = useUserStore();
    const queryClient = useQueryClient()
    return useMutation<LoginResponse, Error, LoginInput>({
        mutationFn: loginUser,
        onSuccess: (data) => {
            if (data?.error) {
                return
            } else if (data?.data) {
                setAccessToken(data?.data.accessToken)
                queryClient.invalidateQueries({ queryKey: ["user"] });
            }
            // Điều hướng
            if (redirectPath) {
                window.location.href = redirectPath; // về lại trang trước đó
                setRedirectPath(null); // reset để lần sau ko bị dính
            } else {
                window.location.href = "/"; // fallback mặc định
            }
        },
        onError: (error) => {
            console.error(error);
            return error.message;
        },
    });
}

export function useRegister() {
    return useMutation<LoginResponse, Error, LoginInput>({
        mutationFn: registerUser,
        onSuccess: (data) => {
            if (data?.error) return;
            window.location.href = "/login"
        },
        onError: (error) => {
            console.log(error)
            return error.message;
        }
    })
}

export function useLogout() {
    const { setLogout } = useUserStore()
    return useMutation({
        mutationFn: logout,
        onSuccess() {
            setLogout()
            window.onload
        },
    })
}

export function useUser(){
    const {setUser} = useUserStore()
    return useMutation({
        mutationFn: getInforUser,
        onSuccess(data){
            if(data){
                setUser({
                    id: data?.data.id,
                    name: data?.data.username,
                    email: data?.data.email
                })
            }
        }
    })
}
