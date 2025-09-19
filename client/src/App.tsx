import './App.css'
import LoginPage from './features/auth/pages/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './routes/mainLayout';
import HomePage from './features/home/pages/Home';
import QuizResults from './features/report/pages/Report';
import DetailCourses from './features/courses/pages/DetailCourse';
import { CourseGrid } from './features/courses/pages/Courses';
import RegisterPage from './features/auth/pages/Register';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CourseGrid />} />
          <Route path="/report" element={<QuizResults />} />
        </Route>
         <Route path="/courses/:id" element={<DetailCourses />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
