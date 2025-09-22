import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex flex-row bg-[#f7f7fd]">
      <Navbar />
      <div className="flex-1 overflow-auto h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
