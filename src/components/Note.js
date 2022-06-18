import styled from 'styled-components';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useNotes from '../hooks/useNotes';
import useNotification from '../hooks/useNotification';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

// Styles
const NoteContainer = styled.div`
  background-color: #374151;
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
`;

const NoteTitle = styled.h3`
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

const ButtonDiv = styled.div`
  background-color: #374151;
  gap: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const BottomDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #374151;
`;

const P = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
`;

const Button = styled.button`
  border-radius: 0.5rem;
  padding: 0.4rem 0.3rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #4b5563;
  }
`;

const CategoryText = styled(P)`
  color: #818cf8;
  font-weight: 700;
`;

const Note = ({ note }) => {
  // Hooks
  const axiosPrivate = useAxiosPrivate();
  const { notes, setNotes } = useNotes();
  const { setNotification } = useNotification();

  // Handlers
  const deleteNote = async (id) => {
    try {
      await axiosPrivate.delete(id);
      const noteToDelete = notes.find(note => note.id === id);
      setNotes(notes.filter(note => note.id !== id ));
      setNotification({
        message: `Note '${noteToDelete.title}' removed successfully 👍`,
        iseError: false,
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error(error);
    }
  }

  // Components
  return (
    <NoteContainer>
      <NoteTitle>{note.title}</NoteTitle>
      <P>{note.content}</P>
      <BottomDiv>
        <CategoryText>{note.category}</CategoryText>
        <ButtonDiv>
          <Link to={`${note.id}`}>
            <Button>
              <FontAwesomeIcon style={{width: '2rem', color: '#9ca3af'}} icon={faPenToSquare}/>
            </Button>
          </Link>
          <Button onClick={() => deleteNote(note.id)}>
            <FontAwesomeIcon style={{width: '2rem', color: '#9ca3af'}} icon={faTrash}/>
          </Button>
        </ButtonDiv>
      </BottomDiv>
    </NoteContainer>
  );
};

export default Note;