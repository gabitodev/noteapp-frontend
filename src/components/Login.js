import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import useAuth from '../hooks/useAuth';
import useNotification from '../hooks/useNotification';
import loginService from '../services/login';
import { useNavigate } from 'react-router-dom';

const Section = styled.section`
  min-height: calc(100vh - 8rem);
  background-color: #1f2937;
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
  padding: 1rem;
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
  background-color: #374151;
  color: white;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
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
  font-weight: 700;
  letter-spacing: 0.05em;
`;

const Input = styled.input`
  color: #dbdbdb;
  font-size: 1.25rem;
  line-height: 1.75rem;
  border-radius: 12px;
  padding: 0.5rem;
  outline-style: none;
  background-color: #4b5563;
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
  transition: all 0.2s ease-in;
  @media (min-width: 1024px) {
    width: 8rem;
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      ${ props => props.disabled
    ? 'none'
    : `color: #1f2937;
          background-color: #fbbf24;`
}
    }
    &:active {
      ${ props => props.disabled
    ? 'none'
    : `transition: none;
          outline: 2px solid #f59e0b;
          background-color: #f59e0b;`
}
    }
  }
  @media (hover: none) and (pointer: coarse) {
    transition: none;
    &:active {
      ${ props => props.disabled
    ? 'none'
    : `background-color: #fbbf24;
          color: #171717;`
}
    }
  }
`;

const FormTitle = styled.h3`
  color: #fbbf24;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
`;

const FormCheckDiv = styled.div`
  width: 100%;
  display: flex;
  jusitfy-content: flex-start;
  align-items: center;
  gap: 0.5rem;
`;

const CheckLabel = styled.label`
  color: #f5f5f5;
  font-size: 1.125rem;
  line-height: 1.5rem;
`;

const CheckInput = styled.input`
  accent-color: #fbbf24;
  transform: scale(1.1);
`;

const Login= () => {
  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Hooks
  const userRef = useRef();
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const { setNotification } = useNotification();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  // Handlers
  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const credentials = await loginService.login({ username, password });
      setAuth(credentials);
      setNotification({
        message: `${username} logged in 🤩`,
        isError: false,
      });
      setTimeout(() => setNotification(null), 3000);
      setUsername('');
      setPassword('');
      navigate('/notes');
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        isError: true,
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const togglePersist = () => {
    setPersist(!persist);
  };

  // Component
  return (
    <Section>
      <Container>
        <Form onSubmit={handleSignIn}>
          <FormTitle>Log In</FormTitle>
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
          <SubmitButton disabled={!username || !password ? true : false}>Login</SubmitButton>
          <FormCheckDiv>
            <CheckLabel htmlFor="persist">Trust this device</CheckLabel>
            <CheckInput type="checkbox" name="persist" id="persist"  onChange={togglePersist} checked={persist} />
          </FormCheckDiv>
        </Form>
      </Container>
    </Section>
  );
};


export default Login;