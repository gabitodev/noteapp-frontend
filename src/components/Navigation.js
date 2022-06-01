import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  justify-content: space-between;
  align-items: center;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  height: inherit;
  z-index: 10;
`;

const Nav = styled.nav`
  background-color : #be123c;
  height: 4rem;
`;

const SignInButton = styled.button`
  color: white;
  font-size: 1.25rem;
  line-height: 1.75rem;
  border: 2px solid white;
  border-radius: 0.5rem;
  padding: 0.3rem 0.8rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: white;
    color: #be123c;
  }
`; // font-size xl

const SignUpButton = styled(SignInButton)`
  background-color: #334155;
  border: 0;
  &:hover {
    background-color: #0f172a;
    color: white;
  }
`;

const Title = styled.h3` 
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2rem;
  cursor: pointer;
`; // Font-size 2xl

const NavLinks = styled.div`
  display: none;
  gap: 1rem;
  @media (min-width: 640px) {
    display: flex;
  }
`;

const HamburgerIcon = styled.button`
  display: block;
  color: white;
  @media (min-width: 640px) {
    display: none;
  }
`;

const DropDownMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  background-color: #1e293b;
  color: white;
  top: ${props => props.navOpen ? '4rem' : '-2rem'};
  left: 0;
  right: 0;
  height: 6rem;
  z-index: -1;
  transition: all 0.3s ease-out;
  @media (min-width: 640px) {
    display: none;
  }
`;

const Svg = styled.svg`
  width: 1.75rem;
  height: 1.75rem;
`;

const Navigation = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <Nav>
      <Container>
        <Title>Gabitodev Notes</Title>
        <NavLinks>
          <SignInButton>Sign In</SignInButton>
          <SignUpButton>Sign Up</SignUpButton>
        </NavLinks>
        {navOpen 
          ? <HamburgerIcon onClick={() => setNavOpen(!navOpen)}>
              <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </Svg>
            </HamburgerIcon>
          : <HamburgerIcon onClick={() => setNavOpen(!navOpen)}>
              <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </Svg>
            </HamburgerIcon>
        }
        <DropDownMenu navOpen={navOpen}>
          <li>Sing Up</li>
          <li>Sign In</li>
        </DropDownMenu>
      </Container>
    </Nav>
  );
};

export default Navigation;