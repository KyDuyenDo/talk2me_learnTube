import type { FunctionComponent } from "react";
import UserProfile from "./UserProfile";

interface NavbarProps {

}

const Navbar: FunctionComponent<NavbarProps> = () => {
    const navbarItem = ["Home", "Courses", "My Report", "Flash Card"]
    return (
        <div className="flex justify-between py-4 px-10 pb-0">
            <div className="logo"></div>
            <div className="flex p-4">
                {
                    navbarItem.map((item) => (
                        <div className="mr-4 h-14 flex items-center">
                            <span className="py-[16px] px-[24px] text-[16px] font-[600] text-[#606070]">
                                {item}
                            </span>
                        </div>
                    ))
                }
            </div>
            <UserProfile />
        </div>
    );
}

export default Navbar;