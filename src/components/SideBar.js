import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faTag } from '@fortawesome/free-solid-svg-icons';
import useNotes from '../hooks/useNotes';
import { useEffect } from 'react';

const SideBarDiv = styled.div`
  position: sticky;
  display: none;
  top: 5rem;
  width: 20%;
  align-self: flex-start;
  @media (min-width: 640px) {
    display: block;
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
  transition: all 0.1s ease-out;
`;

const SideBar = ({setFiltered}) => {
  const { notes } = useNotes();
  const [categories, setCategories] = useState([]);
  const [activeButton, setActiveButton] = useState('1');

  useEffect(() => {
    const categories = notes.map(note => note.category);
    const noDuplicates =[...new Set(categories)]
    setCategories(noDuplicates);
  }, [notes]);

  const filterNotes = (event) => {
    if (event.target.id === '1') {
      setActiveButton(event.target.id);
      setFiltered([]);
    }

    setActiveButton(event.target.id);
    const filteredNotes = (notes.filter(note => note.category === event.target.id));
    setFiltered(filteredNotes);
  }

  return (
    <SideBarDiv>
      <SideBarButton activeButton={activeButton} id='1' onClick={filterNotes}>
        <FontAwesomeIcon icon={faNoteSticky}/> All notes
      </SideBarButton>
      {categories.map(category => {
        return (
          <SideBarButton key={category} activeButton={activeButton} id={category} onClick={filterNotes}>
            <FontAwesomeIcon icon={faTag}/> {category}
          </SideBarButton>
        );
      })}
    </SideBarDiv>
  );
};

export default SideBar;