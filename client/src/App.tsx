import "./App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./providers/ThemeProvider"
import MainLayout from "./layouts/mainLayout"
import HomePage from "./features/home/pages/Home"
import QuizResults from "./features/report/pages/Report"
import DetailCourses from "./features/lesson-part/pages/DetailCourse"
import RegisterPage from "./features/auth/pages/Register"
import LoginPage from "./features/auth/pages/Login"
import AccountPage from "./features/account/page/Account"
import { Courses } from "./features/courses/pages/Courses"
import { useUserStore } from './store/useUserStore';
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { accessToken } = useUserStore();
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/report" element={<QuizResults />} />
              <Route path="/account" element={<AccountPage />} />
            </Route>
          </Route>
          <Route path="/courses/:id" element={<DetailCourses />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
