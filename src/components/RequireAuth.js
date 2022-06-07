import { useLocation, Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.username
    ? <Outlet />
    : <Navigate to='/home' state={{ from: location }} replace />
};

export default RequireAuth;