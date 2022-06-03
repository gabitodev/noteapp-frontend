import axios from 'axios';
const baseUrl = '/api/users';

const register = async userObject => {
  const { data } = await axios.post(baseUrl, userObject);
  return data;
};

const usersService = {
  register,
};

export default usersService;