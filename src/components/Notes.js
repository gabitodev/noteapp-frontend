import { useEffect } from 'react';
import Note from './Note';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import styled from 'styled-components';
import useNotes from '../hooks/useNotes';

const Container = styled.div`
  height: calc(100% - 4rem);
  position: relative;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
`;

const Notes = () => {
  const { notes, setNotes } = useNotes();
  const axiosPrivate = useAxiosPrivate();
  
  useEffect(() => {
    const getNotes = async () => {
      const { data: fetchNotes } = await axiosPrivate.get();
      setNotes(fetchNotes);
    }
    getNotes();
  }, [axiosPrivate, setNotes]);
  
  return (
    <Container>
      {notes.map(note =>
        <Note key={note.id} note={note} />
      )}
    </Container>
  );
};

export default Notes;