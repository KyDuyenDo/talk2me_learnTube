import { useMutation } from '@tanstack/react-query'
import { loginUser, logout, registerUser } from '../features/auth/api/auth.service'
import { useUserStore } from '../store/useUserStore'

type LoginInput = FormData

type LoginResponse = {
    error: string | null;
    data:{
        accessToken: string | undefined
    };
} | undefined

export function useLogin() {
    return useMutation<LoginResponse, Error, LoginInput>({
        mutationFn: loginUser,
        onSuccess: (data) => {
            if(data?.error) return;
            useUserStore.setState({ user: null, accessToken: data?.data?.accessToken })
            window.location.href = "/"
        },
        onError: (error) => {
            console.log(error)
            return error.message;
        }
    })
}

export function useRegister() {
    return useMutation<LoginResponse, Error, LoginInput>({
        mutationFn: registerUser,
        onSuccess: (data) => {
            if(data?.error) return;
            window.location.href = "/login"
        },
        onError: (error) => {
            console.log(error)
            return error.message;
        }
    })
}

export function useLogout(){
    return useMutation({
        mutationFn: logout,
        onSuccess() {
            useUserStore.setState({user: null, accessToken: null})
            window.onload
        },
    })
}