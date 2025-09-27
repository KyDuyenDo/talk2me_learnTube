import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ProfileIcon,
    MailIcon,
    BellIcon,
    TrashIcon,
    ArrowLeftIcon,
} from "../../../assets/icons";
import { useUserStore } from "../../../store/useUserStore";
import { changeInfoUser , useDeleteAccount } from "../hook/useAccount";
import { de } from "zod/v4/locales";

type ProfileProps = {
    onOpen: boolean;
    onClose: () => void;
};

const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function UserProfile({ onOpen, onClose }: ProfileProps) {
    const { mutate: updateUser } = changeInfoUser();
    const deleteMutition = useDeleteAccount();
    
    const { user } = useUserStore();
    const [isEditing, setIsEditing] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
        },
    });

    // Cập nhật form khi user thay đổi
    useEffect(() => {
        reset({
            name: user?.name || "",
            email: user?.email || "",
        });
    }, [user, reset]);

    const handleSave = (data: ProfileFormData) => {
        const reqFormData = new FormData();
        reqFormData.append("name", data.name);
        reqFormData.append("email", data.email);
        updateUser(reqFormData, {
            onError: (errors) => {
                setServerError(errors.message)
            }
        });
        setIsEditing(false)
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete your account?")) {
            deleteMutition.mutate()
        }
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
                <h2 className="text-lg font-semibold mx-3">Profile</h2>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                {/* User info */}
                <div className="rounded-lg border p-4 space-y-3">
                    <form onSubmit={handleSubmit(handleSave)}  className="space-y-3">
                        {/* Name */}
                        <div className="flex items-center gap-3">
                            <ProfileIcon />
                            {isEditing ? (
                                <div className="w-full">
                                    <input
                                        type="text"
                                        {...register("name")}
                                        className="border rounded px-3 py-1 w-full"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p className="font-medium">{user?.name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-3">
                            <MailIcon />
                            {isEditing ? (
                                <div className="w-full">
                                    <input
                                        type="email"
                                        {...register("email")}
                                        className="border rounded px-3 py-1 w-full"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-600">{user?.email}</p>
                            )}
                        </div>

                        {serverError && (
                            <div className="w-full flex justify-center my-2">
                                <p className="text-red-500 text-sm font-semibold">{serverError}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 mt-3">
                            {isEditing && (
                                <>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                    {!isEditing && (

                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            Edit Info
                        </button>

                    )}
                </div>




                {/* Notifications */}
                <div className="rounded-lg border p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
                    <BellIcon />
                    <div>
                        <div className="font-medium">App notifications</div>
                        <p className="text-sm text-gray-500">
                            Manage your app notifications.
                        </p>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="rounded-lg border border-red-300 bg-red-50 cursor-pointer hover:bg-red-100">
                    <div
                        className="flex items-start gap-3 px-4 py-3"
                        onClick={handleDelete}
                    >
                        <div className="mt-1 text-red-600">
                            <TrashIcon />
                        </div>
                        <div>
                            <div className="text-base font-medium text-red-600">
                                Delete account
                            </div>
                            <p className="text-sm text-red-500">
                                This action can not be undone.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
