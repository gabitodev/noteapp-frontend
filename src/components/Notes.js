import { useEffect, useState } from 'react';
import Note from './Note';
import SideBar from './SideBar';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import styled from 'styled-components';
import useNotes from '../hooks/useNotes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateNoteMobile from './CreateNoteMobile';
import CreateNoteDesktop from './CreateNoteDesktop';
import { Outlet } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import useFilter from '../hooks/useFilter';

// Styles
const Container = styled.div`
  height: 100%;
  position: relative;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  @media (min-width: 640px) {
    border-left: 1px solid #fbbf24;
    padding-left: 1rem;
  }
`;

const Section = styled.section`
  display: flex;
  min-height: calc(100vh - 8rem);
  max-width: 80rem;
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
  // States
  const [windowWidth, setWindowWidt] = useState(0);
  const [click, setClick] = useState(false);

  // Hooks
  const { notes, setNotes } = useNotes();
  const axiosPrivate = useAxiosPrivate();
  const { filteredNotes, setFilteredNotes } = useFilter();

  useEffect(() => {
    const getNotes = async () => {
      const { data: fetchNotes } = await axiosPrivate.get();
      setNotes(fetchNotes);
      setFilteredNotes([])
    }
    getNotes();
  }, [axiosPrivate, setNotes, setFilteredNotes]);

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

  // Handlers
  const handleCreate = () => {
    setClick(!click);
  }
  
  // Notes Layout
  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 3,
    640: 1
  };

  // Component
  return (
  <Section>
    <SideBar />
    <Container>
      <CreateNoteDesktop />
      <Outlet />
      {click && windowWidth < 640
        ? <CreateNoteMobile />
        : null
      }
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {filteredNotes.length === 0
          ? notes.map(note =>
              <div key={note.id}>
                <Note note={note} />
              </div>
            )
          : filteredNotes.map(note =>
            <div key={note.id}>
              <Note note={note} />
            </div>
            )
        }
      </Masonry>
        <CreateButton onClick={handleCreate} click={click}>
          <FontAwesomeIcon icon={faPlus} />
        </CreateButton>
      </Container>
   </Section> 
  );
};

export default Notes;