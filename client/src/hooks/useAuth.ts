import { useMutation } from '@tanstack/react-query'
import { loginUser, registerUser } from '../features/auth/api/auth.service'
import { useUserStore } from '../store/useUserStore'

type LoginInput = FormData

type LoginResponse = {
    error: string | null;
    data: any;
}

export function useLogin() {
    return useMutation<LoginResponse, Error, LoginInput>({
        mutationFn: loginUser,
        onSuccess: (data) => {
            console.log(data)
            if(data.error) return;
            useUserStore.setState({accessToken: data.data?.accessToken})
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
            if(data.error) return;
            window.location.href = "/login"
        },
        onError: (error) => {
            console.log(error)
            return error.message;
        }
    })
}