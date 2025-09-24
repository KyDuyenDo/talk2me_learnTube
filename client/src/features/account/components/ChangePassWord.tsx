import { useState } from "react";
import { ArrowLeftIcon, LockIcon } from "../../../assets/icons";

type ChangePasswordProps = {
    onOpen: boolean;
    onClose: () => void;
};

export default function ChangePasswordSidebar({
    onOpen,
    onClose,
}: ChangePasswordProps) {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // TODO: call API change password
        console.log("Change password: ", formData);
        onClose();
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
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                {/* Current password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Current Password
                    </label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* New password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Confirm password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-start gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
