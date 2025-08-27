import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* chỗ để render các route con */}
    </div>
  );
}

export default MainLayout;
