import axios from 'axios';
const baseUrl = '/api/refresh';

const getRefreshToken = async () => {
  const { data } = await axios.get(baseUrl, { withCredentials: true });
  return data;
};

const refreshService = {
  getRefreshToken,
};

export default refreshService;