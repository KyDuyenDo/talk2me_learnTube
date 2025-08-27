import './App.css'
import LoginPage from './features/auth/pages/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './routes/mainLayout';
import HomePage from './features/home/pages/Home';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<h1>Courses Page</h1>} />
          <Route path="/report" element={<h1>Report Page</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
