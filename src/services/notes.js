import axiosPrivate from './private';

const getNotesOfUser = async () => {
  const { data } = await axiosPrivate.get();
  return data;
};

const notesService = {
  getNotesOfUser,
};

export default notesService;