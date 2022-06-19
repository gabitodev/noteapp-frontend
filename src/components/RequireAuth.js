import { useLocation, Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ home }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    <>
      {home
        ? auth?.username
          ? <Navigate to='/notes' state={{ from: location }} replace />
          : <Outlet />
        : auth?.username
          ? <Outlet />
          : <Navigate to='/signin' state={{ from: location }} replace />
      }
    </>
  );
};

export default RequireAuth;