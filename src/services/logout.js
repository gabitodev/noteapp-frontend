import axios from 'axios';
const baseUrl = '/api/logout';

const logout = async () => {
  const { data } = await axios.get(baseUrl, { withCredentials: true });
  return data;
};

const logoutService = {
  logout,
};

export default logoutService;