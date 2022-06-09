import { useEffect, useState } from 'react';
import Note from './Note';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import styled from 'styled-components';
import useNotes from '../hooks/useNotes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateNoteMobile from './CreateNoteMobile';
import CreateNoteDesktop from './CreateNoteDesktop';
import { Outlet } from 'react-router-dom';

const Container = styled.div`
  min-height: calc(100vh - 8rem);
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
  @media (min-width: 640px) {
    display: none;
  }
`;

const Notes = () => {
  const { notes, setNotes } = useNotes();
  const axiosPrivate = useAxiosPrivate();
  const [click, setClick] = useState(false);
  const [windowWidth, setWindowWidt] = useState(0);
  
  useEffect(() => {
    const getNotes = async () => {
      const { data: fetchNotes } = await axiosPrivate.get();
      setNotes(fetchNotes);
    }
    getNotes();
  }, [axiosPrivate, setNotes]);

  useEffect(() => {
    const updateWidth = () => {
      setWindowWidt(window.innerWidth);
    };

    window.addEventListener('resize', updateWidth);
    
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    setClick(false);
  }, [notes]);

  useEffect(() => {
    if (windowWidth > 640) {
      setClick(false);
    }
  }, [windowWidth]);

  const handleCreate = () => {
    setClick(!click);
  }
  
  return (
    <Container>
      <CreateNoteDesktop />
      <Outlet />
      {click && windowWidth < 640
          ? <CreateNoteMobile />
          : null
      }
      {notes.map(note =>
        <Note key={note.id} note={note} />
      )}
      <CreateButton onClick={handleCreate} click={click}>
        <FontAwesomeIcon icon={faPlus} />
      </CreateButton>
    </Container>
  );
};

export default Notes;