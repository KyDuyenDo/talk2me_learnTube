import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../../../store/useUserStore";
import { changeInfo, changePassWord, deleteUser } from "../../auth/api/auth.service";



export function useChangePassword() {
    const { setAccessToken } = useUserStore(); // nếu đổi pass xong backend trả token mới

    return useMutation({
        mutationFn: changePassWord,
        onSuccess: (res) => {
            console.log("Password changed:", res);

            // Nếu API trả về token mới, có thể lưu lại
            if (res?.data?.accessToken) {
                setAccessToken(res.data.accessToken);
            }
        },
        onError: (error: any) => {
            console.error("Change password failed:", error.message);
        },
    });
}

export function changeInfoUser() {
    const { setUser } = useUserStore()
    return useMutation({
        mutationFn: (formData: FormData) => changeInfo(formData),
        onSuccess(data: any) {
            if (data?.error) return;
            setUser({
                id: data.data?.id,
                email: data.data?.email,
                name: data.data?.username
            })
        }
    })
}

export function useDeleteAccount() {
    const { setAccessToken, setUser } = useUserStore();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            setAccessToken("");
            setUser(null);
        },
        onError: (error: any) => {
            console.error("Delete account failed:", error);
        },
    });
}