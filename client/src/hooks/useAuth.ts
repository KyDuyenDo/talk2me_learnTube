// hook dùng React Query (useQuery, useMutation)
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../api/auth/auth.service'
import { useUserStore } from '../store/useUserStore'

type LoginInput = FormData

type LoginResponse = {
    error: Error | null;
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