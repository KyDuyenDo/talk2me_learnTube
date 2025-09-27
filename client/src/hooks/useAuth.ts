import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getInforUser, loginUser, logout, registerUser } from '../features/auth/api/auth.service'
import { useUserStore } from '../store/useUserStore'

type LoginInput = FormData

interface LoginResponse {
    accessToken?: string;
    message?: string;
    error?: string;
}


export function useLogin() {
    const { setAccessToken, redirectPath, setRedirectPath } = useUserStore();
    const queryClient = useQueryClient()
    return useMutation<LoginResponse, Error, LoginInput>({
        mutationFn: loginUser,
        onSuccess: (data : any) => {
            if (data) {
                setAccessToken(data?.accessToken || "")
                queryClient.invalidateQueries({ queryKey: ["user"] });
            }

            if (redirectPath) {
                window.location.href = redirectPath; // về lại trang trước đó
                setRedirectPath(null); // reset để lần sau ko bị dính
            } else {
                window.location.href = "/"; // fallback mặc định
            }
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
