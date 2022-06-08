import { useEffect, useState } from 'react';
import Note from './Note';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import styled from 'styled-components';
import useNotes from '../hooks/useNotes';
import { Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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

const CreateButton = styled.button`
  position: fixed;
  background-color: #fbbf24;
  transform: ${props => props.click ? 'rotate(45deg)' : 'transform(0)'};
  bottom: 5rem;
  right: 1rem;
  color: #171717;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  border-radius: 9999px;
  transition: all 0.3s ease-in;
`;

const Notes = () => {
  const { notes, setNotes } = useNotes();
  const axiosPrivate = useAxiosPrivate();
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getNotes = async () => {
      const { data: fetchNotes } = await axiosPrivate.get();
      setNotes(fetchNotes);
    }
    getNotes();
  }, [axiosPrivate, setNotes]);

  useEffect(() => {
    setClick(false);
  }, [notes]);

  const handleCreate = () => {
    setClick(!click);
    !click ? navigate('create') : navigate('/notes');
  }
  
  return (
    <Container>
      {notes.map(note =>
        <Note key={note.id} note={note} />
      )}
      <Outlet />
      <CreateButton onClick={handleCreate} click={click}>
        <FontAwesomeIcon icon={faPlus} />
      </CreateButton>
    </Container>
  );
};

export default Notes;