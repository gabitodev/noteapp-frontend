import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styles
const Container = styled.div`
  min-height: calc(100% - 4rem);
  max-width: 80rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Title = styled.h1`
  color: #fbbf24;
  font-size: 3rem;
  line-height: 1;
  text-align: center;
  font-weight: 700;
  @media (min-width: 640px) {
    font-size: 4.5rem;
  }
`;

const SubTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-align: center;
  font-weight: 700;
  @media (min-width: 640px) {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
`;

const SignInButton = styled.button`
  color: #fbbf24;
  width: 6rem;
  background-color: #111827;
  border: 2px solid #fbbf24;
  font-size: 1.25rem;
  line-height: 1.75rem;
  border-radius: 0.5rem;
  padding: 0.4rem 0.3rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #fbbf24;
    color: #111827;
  }
  @media (min-width: 640px) {
    font-size: 1.25rem;
    line-height: 1.75rem;
    width: 8rem;
  }
`;

const SignUpButton = styled(SignInButton)`
  color: #818cf8;
  border: 2px solid #818cf8;
  &:hover {
    background-color: #818cf8;
    color: #111827;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 1rem;
  @media (min-width: 640px) {
    margin-top: 1rem;
    gap: 1.5rem;
  }
`;

const Home = () => {
  return (
    <Container>
      <Title>Meet NoteDEV</Title>
      <SubTitle>A web app to store all your notes</SubTitle>
      <ButtonDiv>
        <Link to='/login'>
          <SignInButton>Log In</SignInButton>
        </Link>
        <Link to='/signup'>
          <SignUpButton>Sign Up</SignUpButton>
        </Link>
      </ButtonDiv>
    </Container>
  );
};

export default Home;