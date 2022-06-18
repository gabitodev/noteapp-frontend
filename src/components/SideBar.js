import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faTag } from '@fortawesome/free-solid-svg-icons';
import useNotes from '../hooks/useNotes';
import { useEffect } from 'react';
import useFilter from '../hooks/useFilter';

const SideBarDiv = styled.div`
  position: sticky;
  display: none;
  top: 5rem;
  width: 30%;
  align-self: flex-start;
  overflow: auto;
  max-height: calc(100vh - 10rem);
  @media (min-width: 640px) {
    display: block;
  }
  @media (min-width: 1024px) {
    display: block;
    width: 25%;
  }
`;

const SideBarButton = styled.button`
  display: block;
  text-align: left;
  color: ${props => props.id === props.activeButton ? '#1f2937' : 'white'};
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
  margin-bottom: 1rem;
  width: 90%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${props => props.id === props.activeButton ? '#fbbf24' : 'transparent'};
  word-break: break-all;
  transition: all 0.1s ease-out;
`;

const SideBar = () => {
  // States
  const [activeButton, setActiveButton] = useState('1');
  const [categories, setCategories] = useState([]);

  // Hooks
  const { notes } = useNotes();
  const { setFilteredNotes } = useFilter();

  useEffect(() => {
    const categories = notes.map(note => note.category);
    const noDuplicates =[...new Set(categories)]
    setCategories(noDuplicates);
  }, [notes]);

  // Handlers
  const filterNotes = (event) => {
    if (event.target.id === '1') {
      setActiveButton(event.target.id);
      setFilteredNotes([]);
    }

    setActiveButton(event.target.id);
    const filteredNotes = (notes.filter(note => note.category === event.target.id));
    setFilteredNotes(filteredNotes);
  }

  // Component
  return (
    <SideBarDiv>
      <SideBarButton activeButton={activeButton} id='1' onClick={filterNotes}>
        <FontAwesomeIcon icon={faNoteSticky}/> All notes
      </SideBarButton>
      {categories.map(category => {
        if (category === '') {
          return null
        } else {
          return (
            <SideBarButton key={category} activeButton={activeButton} id={category} onClick={filterNotes}>
              <FontAwesomeIcon icon={faTag}/> {category}
            </SideBarButton>
          );
        }
      })}
    </SideBarDiv>
  );
};

export default SideBar;