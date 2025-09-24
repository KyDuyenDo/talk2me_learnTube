import UserProfile from "../components/UserProfile"
import ChangePasswordSidebar from "../components/ChangePassWord";
import {
    ProfileIcon,
    LockIcon,
    LogoutIcon,
    LanguageIcon
} from "../../../assets/icons";
import { useState } from "react";
// Định nghĩa kiểu cho icon name


export default function Account() {
    const [open, setOpen] = useState(false);
    const [openChange,setOpenChange] = useState(false)
    const items = [
        { icon: <ProfileIcon />, title: "Profile", description: "Manage your profile details.",  onClick: () => setOpen(!open)},
        { icon: <LanguageIcon/>, title: "Language", description: "Manage your account settings.", },
        { icon: <LockIcon />, title: "Change password", description: "Manage your subscriptions.",  onClick: () => setOpenChange(!openChange)  },
        { icon: <LogoutIcon/>, title: "Logout", description: "Logout from your account" },
    ];

    return (
        <>
            <div className="bg-white rounded-xl shadow overflow-hidden max-w-7xl mx-auto px-6 py-8">
                <h1 className="px-4 py-3 text-lg font-semibold">Account Settings</h1>
                {items.map((item) => (
                    <div
                        key={item.title}
                        onClick={item.onClick}
                        className="relative flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 w-full my-5 border  rounded"
                    >
                        {/* Icon */}
                        <div className="p-2 rounded-full bg-gray-100 text-gray-700">
                            {item.icon}
                        </div>

                        {/* Text */}
                        <div>
                            <div className="text-base font-medium text-gray-900">{item.title}</div>
                            {item.description && (
                                <span className="text-sm text-gray-500">{item.description}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <UserProfile onOpen={open} onClose = {()=>setOpen(!open)} />
            <ChangePasswordSidebar onOpen={openChange} onClose = {()=>setOpenChange(!openChange)}/>
        </>
    );
}
