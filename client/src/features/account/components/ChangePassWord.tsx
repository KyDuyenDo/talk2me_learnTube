import { useState } from "react";
import { ArrowLeftIcon } from "../../../assets/icons";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePassword } from "../hook/useAccount";


type ChangePasswordProps = {
    onOpen: boolean;
    onClose: () => void;
};

const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Password is required"),
    newPassword: z.string().min(1, "New password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.newPassword == data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

type passwordFormData = z.infer<typeof passwordSchema>;

export default function ChangePasswordSidebar({
    onOpen,
    onClose,
}: ChangePasswordProps) {

    const changMutition = useChangePassword()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<passwordFormData>({
        resolver: zodResolver(passwordSchema)
    })
    const [serverError, setServerError] = useState<string | null>(null);

    const handleChangePassword = (data: passwordFormData) => {

        const formData = new FormData;
        formData.append("oldPassword", data.currentPassword)
        formData.append("newPassword", data.newPassword)
        changMutition.mutate(formData, {
            onSuccess: (data) => {
                reset({
                    confirmPassword: "",
                    currentPassword: "",
                    newPassword: ""
                })
                alert(data.message)
                onClose();
            },
            onError: (error) => {
                setServerError(error.message)
            }
        })

    };

    return (
        <div
            className={`fixed top-0 my-11 right-0 h-full w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ${onOpen ? "translate-x-0" : "translate-x-full"
                }`}
        >
            {/* Header */}
            <div className="flex items-center p-4">
                <button
                    className="text-gray-500 hover:text-gray-700 left-0"
                    onClick={onClose}
                >
                    <ArrowLeftIcon />
                </button>
                <h2 className="text-lg font-semibold mx-3">Change Password</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleChangePassword)} className="p-4 space-y-4">
                {/* Current password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Current Password
                    </label>
                    <input
                        type="password"
                        {...register("currentPassword")}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.currentPassword && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.currentPassword.message}
                        </p>
                    )}
                </div>

                {/* New password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input
                        type="password"
                        {...register("newPassword")}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.newPassword && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.newPassword.message}
                        </p>
                    )}
                </div>

                {/* Confirm password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        {...register("confirmPassword")}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {serverError && (
                    <div className="w-full flex justify-center my-2">
                        <p className="text-red-500 text-sm font-semibold">{serverError}</p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-start gap-3">
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
