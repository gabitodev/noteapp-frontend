import axios from 'axios';
const baseUrl = '/api/logout';

const logout = async () => {
  const { data } = await axios.post(baseUrl);
  return data;
};

const logoutService = {
  logout,
};

export default logoutService;