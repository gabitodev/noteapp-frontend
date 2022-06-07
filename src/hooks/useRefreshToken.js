import useAuth from '../hooks/useAuth';
import refreshService from '../services/refresh';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await refreshService.getRefreshToken();
    setAuth(prev => {
      return { ...prev, accessToken: response.accessToken, username: response.username }
    });
    return response.accessToken;
  }

  return refresh;
};

export default useRefreshToken;