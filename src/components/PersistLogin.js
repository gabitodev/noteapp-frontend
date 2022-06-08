import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
  const [isLoading, setIsloading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  const accessToken = !auth?.accessToken;

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    };
    accessToken ? verifyRefreshToken() : setIsloading(false);
  }, [accessToken, refresh]);

  return (
    <>
      {!persist
        ? <Outlet />
        : isLoading
          ? <p>Is loading...</p>
          : <Outlet />
      }
    </>
  );
};

export default PersistLogin;