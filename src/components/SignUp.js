import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: calc(100% - 8rem);
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
  height: 26rem;
  border-radius: 0.5rem;
  padding: 2rem;
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
  color: #818cf8;
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
    outline: 3px solid #818cf8;
  }
`;

const SubmitButton = styled.button`
  color: #818cf8;
  width: 100%;
  font-size: 1.25rem;
  line-height: 1.75rem;
  border: 2px solid #818cf8;
  border-radius: 0.5rem;
  padding: 0.4rem 0.3rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #818cf8;
    color: #171717;
  }
  @media (min-width: 1024px) {
    width: 8rem;
  }
`;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const login = (event) => {
    event.preventDefault();
    const signUpForm = {
      username,
      name,
      password
    };
    setUsername('');
    setPassword('');
    setName('');
    console.log(signUpForm);
  }

  return (
    <Container>
      <Form onSubmit={login}>
        <InputDiv>
          <InputLabel htmlFor='username'>Username:</InputLabel>
          <Input
            type='text'
            placeholder='username'
            name='username'
            minLength='6'
            required={true}
            onChange={({ target }) => setUsername(target.value)}
            value={username}/>
        </InputDiv>
        <InputDiv>
          <InputLabel htmlFor='name'>Name:</InputLabel>
          <Input 
            type='text' 
            placeholder='name' 
            name='name'
            required={true}
            onChange={({ target }) => setName(target.value)}
            value={name}/>
        </InputDiv>
        <InputDiv>
          <InputLabel htmlFor='password'>Password:</InputLabel>
          <Input 
            type='password' 
            placeholder='password' 
            name='password'
            required={true}
            onChange={({ target }) => setPassword(target.value)}
            value={password}/>
        </InputDiv>
        <SubmitButton type="submit">Register</SubmitButton>
      </Form>
    </Container>
  );
};

export default SignUp;