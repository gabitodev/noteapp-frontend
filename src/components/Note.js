import styled from 'styled-components';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useNotes from '../hooks/useNotes';
import useNotification from '../hooks/useNotification';
import { Link } from 'react-router-dom';

const NoteContainer = styled.div`
  background-color: #171717;
  position: static;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 10rem;
  color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  gap: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  transition: all 0.3s ease-in-out;
  @media (min-width: 640px) {
    width: 25%;
  }
`;

const NoteTitle = styled.h3`
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Note = ({ note }) => {
  const axiosPrivate = useAxiosPrivate();
  const { notes, setNotes } = useNotes();
  const { setNotification } = useNotification();

  const deleteNote = async (id) => {
    try {
      await axiosPrivate.delete(id);
      const noteToDelete = notes.find(note => note.id === id);
      setNotes(notes.filter(note => note.id !== id ));
      setNotification({
        message: `Note '${noteToDelete.title}' removed successfully 👍`,
        iseError: false,
      });
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <NoteContainer>
        <NoteTitle>{note.title}</NoteTitle>
        <p>{note.content}</p>
        <ButtonDiv>
          <Link to={`${note.id}`}>Edit</Link>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </ButtonDiv>
      </NoteContainer>
    </>
  );
};

export default Note;