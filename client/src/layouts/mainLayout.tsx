import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"

function MainLayout() {
  return (
    <div className="flex flex-row min-h-screen bg-surface">
      <Navbar />
      <div className="flex-1 overflow-auto">
        <main className="p-lg">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
