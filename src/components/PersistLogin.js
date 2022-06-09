import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import styled from 'styled-components';

const Container = styled.div`
  min-height: calc(100% - 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
`;

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
          ? <Container>
               <p>Is loading...</p>
            </Container>
          : <Outlet />
      }
    </>
  );
};

export default PersistLogin;