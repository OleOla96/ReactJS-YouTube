import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useContexts from '../hooks/useContexts';
import jwt_decode from 'jwt-decode';

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useContexts();
  const location = useLocation();
  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const roles = decoded?.roles || [];
  return roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
