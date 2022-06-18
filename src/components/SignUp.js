import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import useNotification from '../hooks/useNotification';
import usersService from '../services/users';
import { useNavigate } from 'react-router-dom';

// Styles
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
  min-height: 32rem;
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
  color: #818cf8;
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
          background-color: #818cf8;`
      }
    }
    &:active {
      ${ props => props.disabled 
        ? 'none' 
        : `transition: none;
          outline: 2px solid #6366f1;
          background-color: #6366f1;`
      }
    }
  }
  @media (hover: none) and (pointer: coarse) {
    transition: none;
    &:active {
      ${ props => props.disabled 
        ? 'none' 
        : `background-color: #818cf8;
          color: #171717;`
      }
    }
  }
`;

const SuccessIcon = styled.span`
  display: ${props => (props.validInput && props.input) ? 'inline' : 'none'};
  padding-left: 0.5rem;
  color: rgb(110 231 183);
`;

const FailureIcon = styled.span`
  display: ${props => (props.validInput || !props.input) ? 'none' : 'inline'};
  padding-left: 0.5rem;
  color: rgb(248 113 113);
`;

const InputInfo = styled.p`
  display: ${props => (props.inputFocus && props.input && !props.validInput) ? 'block' : 'none'};
  font-size: 0.75rem;
  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

const FormTitle = styled.h3`
  color: #818cf8;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
`;

// Validations
const USERNAME_REGEX = /^[a-zA-Z][a-za-z0-9-_]{6,16}$/;
const NAME_REGEX = /^[a-zA-Z][ a-zA-Z]{6,16}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]).{6,24}$/;

const SignUp = () => {
  // States
  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // Hooks
  const usernameRef = useRef();
  const navigate = useNavigate();
  const { setNotification } = useNotification();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    const usernameValidation = USERNAME_REGEX.test(username);
    setValidUsername(usernameValidation);
  }, [username]);

  useEffect(() => {
    const nameValidation = NAME_REGEX.test(name);
    setValidName(nameValidation);
  }, [name]);

  useEffect(() => {
    const passwordValidation = PASSWORD_REGEX.test(password);
    setValidPassword(passwordValidation);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  // Handlers
  const handleSignUp = async (event) => {
    event.preventDefault();
    const newUser = {
      username,
      name,
      password
    };
    try {
      await usersService.register(newUser);
      setNotification({
        message: `User ${username} created!`,
        isError: false,
      });
      setTimeout(() => setNotification(null), 3000);
      setUsername('');
      setName('');
      setPassword('');
      setMatchPassword('');
      navigate('/signin');
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        isError: true,
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Component
  return (
    <Section>
      <Container>
        <Form onSubmit={handleSignUp}>
          <FormTitle>Register</FormTitle>
          <InputDiv>
            <InputLabel htmlFor='username'>
              Username:
              <SuccessIcon validInput={validUsername} input={username}>
                <FontAwesomeIcon icon={faCheck}/>
              </SuccessIcon>
              <FailureIcon validInput={validUsername} input={username}>
                <FontAwesomeIcon icon={faTimes}/>
              </FailureIcon>
            </InputLabel>
            <Input
              type='text'
              id='username'
              ref={usernameRef}
              autoComplete='off'
              required
              onChange={({ target }) => setUsername(target.value)}
              onFocus={() => setUsernameFocus(true)}
              onBlur={() => setUsernameFocus(false)}
              value={username}/>
            <InputInfo inputFocus={usernameFocus} input={username} validInput={validUsername}>
              <FontAwesomeIcon icon={faInfoCircle}/> 6 to 16 characters.<br />
              Must begin with a letter.<br />
              Letters, numbers, underscore, hyphens allowed.
            </InputInfo>
          </InputDiv>
          <InputDiv>
            <InputLabel htmlFor='name'>
              Name:
              <SuccessIcon validInput={validName} input={name}>
                <FontAwesomeIcon icon={faCheck}/>
              </SuccessIcon>
              <FailureIcon validInput={validName} input={name}>
                <FontAwesomeIcon icon={faTimes}/>
              </FailureIcon>
            </InputLabel>
            <Input
              type='text'
              id='name'
              autoComplete='off'
              required
              onChange={({ target }) => setName(target.value)}
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
              value={name}/>
            <InputInfo inputFocus={nameFocus} input={name} validInput={validName}>
              <FontAwesomeIcon icon={faInfoCircle}/> 6 to 16 characters.<br />
              First and last name.
            </InputInfo>
          </InputDiv>
          <InputDiv>
            <InputLabel htmlFor='password'>
              Password:
              <SuccessIcon validInput={validPassword} input={password}>
                <FontAwesomeIcon icon={faCheck}/>
              </SuccessIcon>
              <FailureIcon validInput={validPassword} input={password}>
                <FontAwesomeIcon icon={faTimes}/>
              </FailureIcon>
            </InputLabel>
            <Input
              type='password'
              id='password'
              required
              onChange={({ target }) => setPassword(target.value)}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              value={password}/>
            <InputInfo inputFocus={passwordFocus} input={true} validInput={validPassword}>
              <FontAwesomeIcon icon={faInfoCircle}/> 6 to 24 characters.<br />
              Must include a letter, a number and a special character.<br />
            </InputInfo>
          </InputDiv>
          <InputDiv>
            <InputLabel htmlFor='confirmPassword'>
              Confirm Password:
              <SuccessIcon validInput={validMatch} input={matchPassword}>
                <FontAwesomeIcon icon={faCheck}/>
              </SuccessIcon>
              <FailureIcon validInput={validMatch} input={matchPassword}>
                <FontAwesomeIcon icon={faTimes}/>
              </FailureIcon>
            </InputLabel>
            <Input
              type='password'
              id='confirmPassword'
              required
              onChange={({ target }) => setMatchPassword(target.value)}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              value={matchPassword}/>
            <InputInfo inputFocus={matchFocus} input={true} validInput={validMatch}>
              <FontAwesomeIcon icon={faInfoCircle}/> Must match the first password input field.
            </InputInfo>
          </InputDiv>
          <SubmitButton disabled={!validUsername || !validPassword || !validMatch ? true : false}>Sign Up</SubmitButton>
        </Form>
      </Container>
    </Section>
  );
};

export default SignUp;