import { useState } from 'react';
import styled from 'styled-components';

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
`;

const SideBar = () => {
  const [activeButton, setActiveButton] = useState('1');

  return (
    <SideBarDiv>
      <SideBarButton activeButton={activeButton} id='1' onClick={(e) => setActiveButton(e.target.id)}>All notes</SideBarButton>
      <SideBarButton activeButton={activeButton} id='2' onClick={(e) => setActiveButton(e.target.id)}>Shop</SideBarButton>
    </SideBarDiv>
  );
};

export default SideBar;