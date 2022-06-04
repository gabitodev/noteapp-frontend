import axios from 'axios';
const baseUrl = '/api/login';

const login = async userObject => {
  const { data } = await axios.post(baseUrl, userObject);
  return data;
};

const loginService = {
  login,
};

export default loginService;