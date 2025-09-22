import type { FunctionComponent } from "react";
import { NavLink, useLocation, type To } from "react-router-dom";

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
        <aside>
            <div className="flex bg-white flex-[0_0_auto] overflow-visible relative w-60 h-full transition-[width,left] duration-300 ease-out">
                <div className="sticky bg-white box-content flex flex-col justify-between flex-[1_1_auto] pl-4 left-0 top-16 w-60 h-[calc(100dvh-4rem)] transition-[width, left] duration-300 ease-out">
                    <nav className="flex-[1_1_auto] mb-auto overflow-x-hidden overflow-y-auto pr-6 pt-2">
                        <div className="flex flex-col gap-4">
                            {
                                navbarItem.map((item) => <NavItem title={item.title} link={item.link} active={currentPath === item.link} />)
                            }
                        </div>
                    </nav>
                </div>
            </div>
        </aside>
    );
};

const NavItem: FunctionComponent<{ title: string, link: string, active: boolean }> = ({ title, link, active }) => {
    return <div className="rounded-lg overflow-hidden">
        <div className={`max-w-[12.5rem] flex rounded-lg hover:bg-gray-100 ${active ? '!bg-gray-100' : ''}`}>
            <NavLink to={link as To} className="w-full m-0 overflow-hidden rounded-lg appearance-none bg-transparent border-none cursor-pointer">
                <div className="flex flex-col pr-4 pl-2 pt-0 pb-0 relative">
                    <div className="h-10 flex gap-2 items-center font-semibold text-sm leading-[1.4285714286]">
                        <div className="flex justify-center items-center">

                            <span className="text-base font-semibold leading-6">{title}</span>
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    </div>;
}

export default Navbar;
