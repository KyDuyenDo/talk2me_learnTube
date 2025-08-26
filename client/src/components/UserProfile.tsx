import { useEffect, useRef, useState, type FunctionComponent } from "react";
import { UserIcon } from "../utils/constant/icon";

interface UserProfileProps {

}

const UserProfile: FunctionComponent<UserProfileProps> = () => {
    const [showDropDown, setShowDropDown] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null);
    const dropDownItem = ["Profile", "Logout"]

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowDropDown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    return (
        <div className="relative flex justify-center items-center" ref={containerRef}>
            <p className="w-5 text-[12px] font-[700] text-[#606070]">Ky</p>
            <button onClick={() => setShowDropDown(!showDropDown)}>{<UserIcon />}</button>
            {
                showDropDown && (
                    <div className="absolute transition-all duration-500 right-0 top-[64px] p-4 min-w-[240px] border border-[#e6e6eb] bg-amber-100">
                        {
                            dropDownItem.map((item, index) => (
                                <p className={`${index == 0 ? 'pt-[12px] pb-[24px]' : 'pb-[12px]'}  pl-[16px] text-[16px] font-[400] hover:cursor-pointer`}>{item}</p>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}

export default UserProfile;