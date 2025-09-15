import './App.css'
import LoginPage from './features/auth/pages/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './routes/mainLayout';
import HomePage from './features/home/pages/Home';
import QuizResults from './features/report/pages/Report';
import DetailCourses from './features/courses/pages/DetailCourse';
import { CourseGridWithPagination } from './features/courses/components/CourseGridWithPagination';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CourseGridWithPagination />} />
          <Route path="/report" element={<QuizResults />} />
        </Route>
         <Route path="/courses/:id" element={<DetailCourses />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
