import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const Container = styled.section`
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
  min-height: 28rem;
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
  opacity: ${props => props.disabled ? '0.3' : '1'};
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #818cf8;
    color: #171717;
  }
  @media (min-width: 1024px) {
    width: 8rem;
  }
`;

const SuccessIcon = styled.span`
  display: ${props => (props.validInput && props.input) ? 'inline' : 'none'};
  padding-left: 0.5rem;
`;

const FailureIcon = styled.span`
  display: ${props => (props.validInput || !props.input) ? 'none' : 'inline'};
  padding-left: 0.5rem;
`;

const InputInfo = styled.p`
  display: ${props => (props.inputFocus && props.input && !props.validInput) ? 'block' : 'none'};
  font-size: 0.75rem;
`;

const USERNAME_REGEX = /^[a-zA-Z][a-za-z0-9-_]{6,16}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,16}$/;

const SignUp = () => {
  const userRef = useRef();

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const usernameValidation = USERNAME_REGEX.test(username);
    setValidUsername(usernameValidation);
  }, [username]);

  useEffect(() => {
    const passwordValidation = PASSWORD_REGEX.test(password);
    setValidPassword(passwordValidation);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  return (
    <Container>
      <Form>
        <h1>Register</h1>
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
            ref={userRef}
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
            <FontAwesomeIcon icon={faInfoCircle}/> 6 to 16 characters.<br />
            Must include uppercase and lowercase letters, a number and a special character.<br />
            Allowed special characters: !@#$%.
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
  );
};

export default SignUp;