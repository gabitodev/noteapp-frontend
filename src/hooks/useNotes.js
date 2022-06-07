import { useContext } from 'react';
import NotesContext from '../context/NotesProvider';

const useNotes = () => {
  return useContext(NotesContext);
};

export default useNotes;