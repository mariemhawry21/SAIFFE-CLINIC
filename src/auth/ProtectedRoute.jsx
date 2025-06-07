// auth/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ allowedRoles }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;

  return <Outlet />;
}
