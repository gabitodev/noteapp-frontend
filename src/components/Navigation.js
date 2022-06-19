import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useNotification from '../hooks/useNotification';
import useFilter from '../hooks/useFilter';
import useNotes from '../hooks/useNotes';
import logoutService from '../services/logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faTag, faRightFromBracket, faBars, faX } from '@fortawesome/free-solid-svg-icons';

// Nav styles
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
`;

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
`;

const NavLinks = styled.div`
  display: none;
  gap: 1rem;
  @media (min-width: 640px) {
    display: flex;
    align-items: center;
  }
`;

const IconDiv = styled.div`
  display: block;
  color: #fbbf24;
  @media (min-width: 640px) {
    display: none;
  }
`;

// DropdownMenu styles
const DropDownMenu = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  align-items: flex-start;
  justify-content: flex-start;
  position: fixed;
  background-color: #111827;
  padding-top: 4rem;
  color: ${props => props.isNavOpen ? 'white' : '#111827'};
  top: 0;
  right: ${props => props.isNavOpen ? '0' : '-50%'};
  height: 100%;
  width: 50%;
  z-index: 2;
  transition: all 0.4s ease-out;
  @media (min-width: 640px) {
    display: none;
  }
`;

const DropDownLink = styled(Link)`
  padding: 1rem;
  width: 100%;
  text-align: start;
  font-weight: 700;
  background-color: ${props => props.id === props.active ? '#fbbf24' : 'transparent'};
  color: ${props => props.id === props.active ? '#1f2937' : 'white'};
  word-break: break-all;
`;

const DropDownButton = styled.button`
  padding: 1rem;
  width: 100%;
  text-align: start;
  font-weight: 700;
  background-color: ${props => props.id === props.active ? '#fbbf24' : 'transparent'};
  color: ${props => props.id === props.active ? '#1f2937' : 'white'};
  word-break: break-all;
`;

const Navigation = () => {
  // States
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [categories, setCategories ] = useState([]);
  const [active, setActive] = useState('1');

  //Hooks
  const { auth, setAuth } = useAuth();
  const { setNotification } = useNotification();
  const { filteredNotes, setFilteredNotes } = useFilter();
  const { notes } = useNotes();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const categories = notes.map(note => note.category);
    const categoriesWithoutDuplicates =[...new Set(categories)];
    setCategories(categoriesWithoutDuplicates);
  }, [notes]);

  useEffect(() => {
    if (filteredNotes.length === 0) {
      setActive('1');
    }
  }, [filteredNotes]);

  // Handlers
  const filterNotes = (event) => {
    if (event.target.id === '1') {
      setActive(event.target.id);
      setFilteredNotes([]);
      setIsNavOpen(!isNavOpen);
    }
    setActive(event.target.id);
    const filteredNotes = (notes.filter(note => note.category === event.target.id));
    setFilteredNotes(filteredNotes);
    setIsNavOpen(!isNavOpen);
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
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({
        message: error.response.data,
        isError: true,
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleNavOpen = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Renders
  const renderNavLinks = (pathname) => {
    switch (pathname) {
    case '/signup':
      return  <Link to='/login'>
        <LoginButton>Log In</LoginButton>
      </Link>;
    case '/login':
      return  <Link to='/signup'>
        <SignUpButton>Sign Up</SignUpButton>
      </Link>;
    default:
      return null;
    }
  };

  const renderDropDownLinks = (pathname) => {
    switch (pathname) {
    case '/signup':
      return  <DropDownLink active={active} to='/login' onClick={handleNavOpen}>Log In</DropDownLink>;
    case '/login':
      return  <DropDownLink active={active} to='/signup' onClick={handleNavOpen}>Sign Up</DropDownLink>;
    default:
      return  <>
        <DropDownLink active={active} to='/login' onClick={handleNavOpen}>Log In</DropDownLink>;
        <DropDownLink active={active} to='/signup' onClick={handleNavOpen}>Sign Up</DropDownLink>;
      </>;
    }
  };

  // Component
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
        {isNavOpen
          ? <IconDiv>
            <FontAwesomeIcon icon={faX} onClick={handleNavOpen} size='lg' color='#fbbf24'/>
          </IconDiv>
          : <IconDiv>
            <FontAwesomeIcon icon={faBars} onClick={handleNavOpen} size='lg' color='#fbbf24'/>
          </IconDiv>
        }
      </Container>
      {auth.username
        ? <DropDownMenu isNavOpen={isNavOpen}>
          <DropDownButton active={active} id='1' onClick={filterNotes}>
            <FontAwesomeIcon icon={faNoteSticky}/> All Notes
          </DropDownButton>
          {categories.map(category => {
            if (category === '') {
              return null;
            } else {
              return (
                <DropDownButton active={active} key={category} id={category} onClick={filterNotes}>
                  <FontAwesomeIcon icon={faTag}/> {category}
                </DropDownButton>
              );
            }
          })}
          <DropDownLink active={active} id='signout' to='/' onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket}/> Sign Out
          </DropDownLink>
        </DropDownMenu>
        : <DropDownMenu isNavOpen={isNavOpen}>
          {renderDropDownLinks(pathname)}
        </DropDownMenu>
      }
    </Nav>
  );
};

export default Navigation;