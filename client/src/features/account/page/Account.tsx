import UserProfile from "../components/UserProfile";
import ChangePasswordSidebar from "../components/ChangePassWord";
import {
    ProfileIcon,
    LockIcon,
    LogoutIcon,
    LanguageIcon,
} from "../../../assets/icons";
import { useEffect, useState } from "react";
import { useLogout, useUser } from "../../../hooks/useAuth";


export default function Account() {
    const logoutMutation = useLogout()
    const user = useUser()
    const [open, setOpen] = useState(false);
    const [openChange, setOpenChange] = useState(false);

    useEffect(()=>{
        user.mutate()
    },[])

    const handleLogout = async () => {
        logoutMutation.mutate()
    };

    const handleOpenProfile=()=>{
        setOpen((prev) => !prev)
        setOpenChange(false)
    }

    const handleOpenPassWord=()=>{
        setOpenChange((prev) => !prev)
        setOpen(false)
    }

    const items = [
        {
            icon: <ProfileIcon />,
            title: "Profile",
            description: "Manage your profile details.",
            onClick: handleOpenProfile,
        },
        {
            icon: <LanguageIcon />,
            title: "Language",
            description: "Manage your account settings.",
        },
        {
            icon: <LockIcon />,
            title: "Change password",
            description: "Manage your subscriptions.",
            onClick: handleOpenPassWord,
        },
        {
            icon: <LogoutIcon />,
            title: "Logout",
            description: "Logout from your account",
            onClick: handleLogout, 
        },
    ];

    return (
        <>
            <div className="bg-white rounded-xl shadow overflow-hidden max-w-7xl mx-auto px-6 py-8">
                <h1 className="px-4 py-3 text-lg font-semibold">Account Settings</h1>
                {items.map((item) => (
                    <div
                        key={item.title}
                        onClick={item.onClick}
                        className="relative flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 w-full my-5 border rounded"
                    >
                        {/* Icon */}
                        <div className="p-2 rounded-full bg-gray-100 text-gray-700">
                            {item.icon}
                        </div>

                        {/* Text */}
                        <div>
                            <div className="text-base font-medium text-gray-900">
                                {item.title}
                            </div>
                            {item.description && (
                                <span className="text-sm text-gray-500">
                                    {item.description}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Sidebars */}
            <UserProfile onOpen={open} onClose={() => setOpen(false)} />
            <ChangePasswordSidebar
                onOpen={openChange}
                onClose={() => setOpenChange(false)}
            />
        </>
    );
}
