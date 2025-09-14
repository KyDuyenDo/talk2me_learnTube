import type { FunctionComponent } from "react";
import UserProfile from "./UserProfile";
import { NavLink, useLocation } from "react-router-dom";

const Navbar: FunctionComponent = () => {
    const navbarItem = [{
        title: "Home",
        link: "/"
    }, {
        title: "Courses",
        link: "/courses"
    }, {
        title: "My Report",
        link: "/report"
    }, {
        title: "Flash Card",
        link: "/flashcard"
    }]
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="flex justify-between py-4 px-10 pb-0">
            <div className="logo"></div>
            <div className="flex p-4">
                {
                    navbarItem.map((item) => (
                        <div className="mr-4 h-14 flex items-center">
                            <NavLink to={item.link} className={`py-[16px] px-[24px] text-[16px] font-[600] text-[#606070] ${currentPath === item.link ? 'font-[700] text-black bg-gray-100 rounded-4xl' : ''}`}>
                                {item.title}
                            </NavLink>
                        </div>
                    ))
                }
            </div>
            <UserProfile />
        </div>
    );
};

export default Navbar;
