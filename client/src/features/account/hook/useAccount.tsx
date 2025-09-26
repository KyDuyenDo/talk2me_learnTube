import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../../../store/useUserStore";
import { changeInfo }  from "../../auth/api/auth.service";


export function changePassWord(){
    
}

export function changeInfoUser(){
    const { setUser } = useUserStore()
    return useMutation({
        mutationFn:(formData: FormData) => changeInfo(formData),
        onSuccess(data: any){
            if(data?.error) return;
            setUser({
                id: data.data?.id,
                email: data.data?.email,
                name: data.data?.username
            })
        }
    })
}

export function deleteAccout(){

}