import './App.css'
import LoginPage from './features/auth/pages/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './routes/mainLayout';
import HomePage from './features/home/pages/Home';
import QuizResults from './features/report/pages/Report';
import { CourseGrid } from './features/courses/pages/Courses';
import QuizPage from './features/courses/pages/Quiz';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CourseGrid />} />
          <Route path="/report" element={<QuizPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
