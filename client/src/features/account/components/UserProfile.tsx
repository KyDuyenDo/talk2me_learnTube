import { useEffect, useState } from "react";
import {
    ProfileIcon,
    MailIcon,
    BellIcon,
    TrashIcon,
    ArrowLeftIcon,
} from "../../../assets/icons";
import { useUserStore } from "../../../store/useUserStore";
import { changeInfoUser } from "../hook/useAccount";

type ProfileProps = {
    onOpen: boolean;
    onClose: () => void;
};

export default function UserProfile({ onOpen, onClose }: ProfileProps) {
    const { mutate: updateUser } = changeInfoUser()
    const { user, setUser } = useUserStore()
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name,
        email: user?.email
    });

    useEffect(() => {
        setFormData({
            name: user?.name,
            email: user?.email
        });
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const reqFormData = new FormData();
        if (formData?.name) reqFormData.append("name", formData.name);
        if (formData?.email) reqFormData.append("email", formData.email);
        updateUser(reqFormData);
        setIsEditing(false)
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete your account?")) {
            // TODO: Gọi API xoá tài khoản
            console.log("Account deleted");
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
                    {/* Name */}
                    <div className="flex items-center gap-3">
                        <ProfileIcon />
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border rounded px-3 py-1 w-full"
                            />
                        ) : (
                            <p className="font-medium">{user?.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3">
                        <MailIcon />
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border rounded px-3 py-1 w-full"
                            />
                        ) : (
                            <p className="text-gray-600">{user?.email}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-3">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >

                                Edit Info
                            </button>
                        )}
                    </div>
                </div>

                {/* Notifications (demo giữ lại từ code cũ) */}
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
                    <div className="flex items-start gap-3 px-4 py-3" onClick={handleDelete}>
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
