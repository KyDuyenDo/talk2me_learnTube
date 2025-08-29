import type { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import UserProfile from "./UserProfile";

const Navbar: FunctionComponent = () => {
  const navbarItem = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "My Report", path: "/report" },
    { label: "Flash Card", path: "/flashcard" },
  ];

  return (
    <div className="flex justify-between py-4 px-10 pb-0">
      <div className="logo"></div>
      <div className="flex p-4">
        {navbarItem.map((item) => (
          <div
            key={item.path}
            className="mr-4 h-14 flex items-center"
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `py-[16px] px-[24px] text-[16px] font-[600] ${
                  isActive ? "text-blue-600" : "text-[#606070]"
                }`
              }
            >
              {item.label}
            </NavLink>
          </div>
        ))}
      </div>
      <UserProfile />
    </div>
  );
};

export default Navbar;
