import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import useAuth from '../hooks/useAuth';
import useNotification from '../hooks/useNotification';
import loginService from '../services/login';
import { useNavigate } from 'react-router-dom';

const Section = styled.section`
  min-height: calc(100vh - 8rem);
  background-color: #18181b;
`;


const Container = styled.section`
  min-height: calc(100vh - 8rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 26rem;
  border-radius: 0.5rem;
  padding: 1.5rem;
  background-color: #171717;
  color: white;
  @media (min-width: 768px) {
    width: 75%;
  }
  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

const InputLabel = styled.label`
  color: #fbbf24;
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const Input = styled.input`
  color: #dbdbdb;
  font-size: 1.25rem;
  line-height: 1.75rem;
  border-radius: 12px;
  padding: 0.5rem;
  outline-style: none;
  background-color: #222222;
  &:focus {
    outline: 3px solid #fbbf24;
  }
`;

const SubmitButton = styled.button`
  color: #fbbf24;
  width: 100%;
  font-size: 1.25rem;
  line-height: 1.75rem;
  border: 2px solid #fbbf24;
  border-radius: 0.5rem;
  padding: 0.4rem 0.3rem;
  opacity: ${props => props.disabled ? '0.3' : '1'};
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #fbbf24;
    color: #171717;
  }
  @media (min-width: 1024px) {
    width: 8rem;
  }
`;

const FormTitle = styled.h3`
  color: #fbbf24;
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const SignIn= () => {
  const userRef = useRef();
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();
    const credentials = await loginService.login({ username, password });
    setAuth(credentials);
    setNotification({
      message: `${username} logged in!`,
      isError: false,
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000);
    setUsername('');
    setPassword('');
    navigate('/notes');
  };

  const togglePersist = () => {
    setPersist(!persist);
  };

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);
  
  return (
    <Section>
      <Container>
        <Form onSubmit={handleSignIn}>
          <FormTitle>Sign In</FormTitle>
          <InputDiv>
            <InputLabel htmlFor='username'>
              Username:
            </InputLabel>
            <Input
              type='text'
              id='username'
              ref={userRef}
              autoComplete='off'
              required
              onChange={({ target }) => setUsername(target.value)}
              value={username}/>
          </InputDiv>
          <InputDiv>
            <InputLabel htmlFor='password'>
              Password:
            </InputLabel>
            <Input
              type='password'
              id='password'
              required
              onChange={({ target }) => setPassword(target.value)}
              value={password}/>
          </InputDiv>
          <SubmitButton disabled={!username || !password ? true : false}>Sign In</SubmitButton>
          <div>
            <label htmlFor="persist">Trust this device</label>
            <input type="checkbox" name="persist" id="persist" onChange={togglePersist} checked={persist} />
          </div>
        </Form>
      </Container>
    </Section>
  );
};


export default SignIn;