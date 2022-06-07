import styled from 'styled-components';
import { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useNotes from '../hooks/useNotes';
import EditForm from './EditForm';

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
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { notes, setNotes } = useNotes();

  const deleteNote = async (id) => {
    await axiosPrivate.delete(id);
    setNotes(notes.filter(note => note.id !== id ));
  }
  return (
    <>{
      isCreating
      ? <h1>YES!</h1>
      : <>
          {isEditing
            ? <EditForm note={note} setIsEditing={setIsEditing}/>
            : <NoteContainer>
                <NoteTitle>{note.title}</NoteTitle>
                <p>{note.content}</p>
                <ButtonDiv>
                  <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
                  <button onClick={() => deleteNote(note.id)}>Delete</button>
                </ButtonDiv>
              </NoteContainer>    
          }
        </>
      }
    </>
  );
};

export default Note;