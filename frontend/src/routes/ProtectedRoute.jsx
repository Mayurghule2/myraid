import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuth = true; // cookie-based auth; backend enforces protection
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;