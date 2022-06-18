import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Styles
const Container = styled.footer`
  display: flex;
  background-color: ${props => props.changeBackground ? '#1f2937' : 'transparent'};
  justify-content: center;
  align-items: center;
  height: 4rem;
`;

const Text = styled.p`
  color: white;
  font-size: 1.125rem;
  line-height: 1.50rem;
  @media (min-width: 640px) {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
`;

const HeartIcon = styled.span`
  color: #818cf8;
`;

const Footer = () => {
  // States
  const [changeBackground, setChangeBackground] = useState(false);
  
  // Hooks
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/') {
      setChangeBackground(true);
    } else {
      setChangeBackground(false);
    }
  }, [pathname]);

  // Component
  return (
    <Container changeBackground={changeBackground}>
      <Text>Made with <HeartIcon>❤</HeartIcon> by Gabriel Garcia</Text>
    </Container>
  );
}

export default Footer;