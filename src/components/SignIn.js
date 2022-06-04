import styled from 'styled-components';

const Container = styled.div`
  min-height: calc(100% - 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
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
  height: 20rem;
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
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #fbbf24;
    color: #171717;
  }
  @media (min-width: 1024px) {
    width: 8rem;
  }
`;

const SignIn = ({ username, password, handleUsernameChange, handlePasswordChange, handleSubmit }) => {
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputDiv>
          <InputLabel htmlFor='username'>Username:</InputLabel>
          <Input
            type='text'
            placeholder='username'
            name='username'
            minLength='6'
            required={true}
            onChange={handleUsernameChange}
            value={username}/>
        </InputDiv>
        <InputDiv>
          <InputLabel htmlFor='password'>Password:</InputLabel>
          <Input 
            type='password' 
            placeholder='password' 
            name='password'
            required={true}
            onChange={handlePasswordChange}
            value={password}/>
        </InputDiv>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </Container>
  );
};

export default SignIn;