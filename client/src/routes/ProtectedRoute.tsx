import { useUserStore } from '../store/useUserStore';
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { accessToken } = useUserStore();
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}