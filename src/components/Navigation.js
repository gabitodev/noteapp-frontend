import styled from 'styled-components';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import logoutService from '../services/logout';
import useNotification from '../hooks/useNotification';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #111827;
  align-items: center;
  max-width: 80rem;
  height: inherit;
  position: relative;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
  z-index: 10;
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #111827;
  width: 100%;
  height: 4rem;
  z-index: 2;
`;

const LoginButton = styled.button`
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

const SignUpButton = styled(LoginButton)`
  color: #818cf8;
  border: 2px solid #818cf8;
  &:hover {
    background-color: #818cf8;
    color: #171717;
  }
`;

const Title = styled.h3` 
  color: #fbbf24;
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
  justify-content: flex-start;
  position: fixed;
  background-color: #111827;
  padding-top: 4rem;
  color: ${props => props.navOpen ? 'white' : '#111827'};
  top: 0;
  right: ${props => props.navOpen ? '0' : '-6rem'};
  height: 100%;
  width: ${props => props.navOpen ? '50%' : '0'};
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

const DropDownLink = styled.div`
  padding: 1rem;
`;

const Navigation = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const { setNotification } = useNotification();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavOpen = () => {
    setNavOpen(!navOpen);
  }

  const renderNavLinks = (pathname) => {
    switch (pathname) {
      case '/signup':
        return  <Link to='/login'><LoginButton>Log In</LoginButton></Link>;
      case '/login':
        return <Link to='/signup'><SignUpButton>Sign Up</SignUpButton></Link>;
      default:
        return null;
    };
  };

  const renderDropDown = (pathname) => {
    switch (pathname) {
      case '/signup':
        return  <DropDownLink>
                  <Link to='/login' onClick={handleNavOpen}>Log In</Link>
                </DropDownLink>
      case '/login':
        return <DropDownLink>
                <Link to='/signup' onClick={handleNavOpen}>Sign Up</Link>
              </DropDownLink>
      default:
        return null;
    };
  };

  const handleLogout = async () => {
    try {
      await logoutService.logout();
      handleNavOpen();
      setAuth({});
      navigate('/');
      setNotification({
        message: 'Successfully logged out 👍',
        isError: false
      });
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      setNotification({
        message: error.response.data,
        isError: true,
      });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <Nav>
      <Container>
        {auth.username
          ? <Link to='/notes'><Title>NoteDEV</Title></Link>
          : <Link to='/'><Title>NoteDEV</Title></Link>
        }
          {auth.username
            ? <NavLinks>
                  <LoginButton onClick={handleLogout}>Sign Out</LoginButton>
              </NavLinks>
            : <NavLinks>
                {renderNavLinks(pathname)}
              </NavLinks>
          }
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
      {auth.username
        ? <DropDownMenu navOpen={navOpen}>
            <DropDownLink>
              <Link to='/' onClick={handleLogout}>Sign Out</Link>
            </DropDownLink>
          </DropDownMenu>
        : <DropDownMenu navOpen={navOpen}>
            {renderDropDown(pathname)}
          </DropDownMenu>
      }
    </Nav>
  );
};

export default Navigation;