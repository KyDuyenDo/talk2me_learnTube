import "./App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
import MainLayout from "./layouts/mainLayout"
import HomePage from "./features/home/pages/Home"
import QuizResults from "./features/report/pages/Report"
import DetailCourses from "./features/lesson-part/pages/DetailCourse"
import RegisterPage from "./features/auth/pages/Register"
import LoginPage from "./features/auth/pages/Login"
import { Courses } from "./features/courses/pages/Courses"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/report" element={<QuizResults />} />
          </Route>
          <Route path="/courses/:id" element={<DetailCourses />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
