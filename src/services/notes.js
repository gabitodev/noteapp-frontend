import axios from 'axios';
const baseUrl = '/api/notes';

const getNotesOfUser = async () => {
  const { data } = await axios.get(baseUrl, {withCredentials: true});
  console.log(data);
  return data;
};

const notesService = {
  getNotesOfUser,
};

export default notesService;