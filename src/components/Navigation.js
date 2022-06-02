import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  position: relative;
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
  background-color : #171717;
  height: 4rem;
`;

const SignInButton = styled.button`
  color: #fbbf24;
  font-size: 1.25rem;
  line-height: 1.75rem;
  width: 8rem;
  border: 2px solid #fbbf24;
  border-radius: 0.5rem;
  padding: 0.4rem 0.3rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #fbbf24;
    color: #171717;
  }
`; // font-size xl

const SignUpButton = styled(SignInButton)`
  color: #818cf8;
  border: 2px solid #818cf8;
  &:hover {
    background-color: #818cf8;
    color: #171717;
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
    align-items: center;
  }
`;

const HamburgerIcon = styled.button`
  display: block;
  color: #fbbf24;
  @media (min-width: 640px) {
    display: none;
  }
`;

const DropDownMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  background-color: #171717;
  color: ${props => props.navOpen ? 'white' : '#171717'};
  top: ${props => props.navOpen ? '4rem' : '-2rem'};
  left: 0;
  right: 0;
  height: 6rem;
  z-index: 2;
  transition: all 0.3s ease-out;
  @media (min-width: 640px) {
    display: none;
  }
`;

const Svg = styled.svg`
  width: 2rem;
  height: 2rem;
`;

const Navigation = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNavOpen = () => {
    setNavOpen(!navOpen);
  }

  return (
    <Nav>
      <Container>
        <Link to='/'><Title>NoteDEV</Title></Link>
        <NavLinks>
          <Link to='/signin'>
            <SignInButton>Sign In</SignInButton>
          </Link>
          <Link to='/signup'>
            <SignUpButton>Register</SignUpButton>
          </Link>
        </NavLinks>
        {navOpen 
          ? <HamburgerIcon onClick={handleNavOpen}>
              <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path strokeLinecap='round' strokeLinejoin='round' d="M6 18L18 6M6 6l12 12" />
              </Svg>
            </HamburgerIcon>
          : <HamburgerIcon onClick={handleNavOpen}>
              <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path strokeLinecap='round' strokeLinejoin='round' d="M4 6h16M4 12h16M4 18h16" />
              </Svg>
            </HamburgerIcon>
        }
      </Container>
      <DropDownMenu navOpen={navOpen}>
          <Link to='/signin' onClick={handleNavOpen}>Sign In</Link>
          <Link to='/signup' onClick={handleNavOpen}>Sign Up</Link>
      </DropDownMenu>
    </Nav>
  );
};

export default Navigation;