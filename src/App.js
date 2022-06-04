import './app.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Notification from './components/Notification';
import usersService from './services/users';
import loginService from './services/login';
import notesService from './services/notes';
import logoutService from './services/logout';

const Notes = ({ notes, logout }) => {
  return(
    <>
      {notes.map(note => <p key={note.id}>{note.title}</p> )}
      <button onClick={logout}>Buttonnnn</button>
    </>
  );
}

const App = () => {
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    notesService.getNotesOfUser().then(notes => {
      if (!notes) setUser(null);
      if (!user) setUser(notes[0].user.username)
      setNotes(notes);
    });
  }, [user]);

  const registerUser = async event => {
    event.preventDefault();
    try {
      const userObject = {
        username,
        name,
        password
      };
      const userCreated = await usersService.register(userObject);
      setUsername('');
      setPassword('');
      setName('');
      setNotification({
        message: `User ${userCreated.username} created`,
        isError: false,
      });
      setTimeout(() => setNotification(null), 5000);
      navigate('/signin');
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        isError: true,
      });
      setTimeout(() => setNotification(null), 5000);
    };
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const loginForm = {
        username,
        password
      };
      await loginService.login(loginForm);
      setUser(loginForm.username);
      setUsername('');
      setPassword('');
      setNotification({
        message: `Welcome back ${loginForm.username}`,
        isError: false,
      })
      setTimeout(() => setNotification(null), 5000);
      navigate('/notes');
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        isError: true,
      })
      setTimeout(() => setNotification(null), 5000);
    }
  }

  const logout = async () => {
    await logoutService.logout();
    setUser(null);
    setNotes([]);
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  return (
    <>
      <Navigation />
      <Notification notification={notification} />
      <Routes>
        <Route path='/notes' element={user ? <Notes notes={notes} logout={logout} /> : <Navigate to='/' replace={true} />}/>
        <Route path='/' element={!user ? <Home /> : <Navigate to='/notes' replace={true} />}/>
        <Route 
          path='/signup' 
          element={
            <SignUp 
            username={username} 
            password={password} 
            name={name} 
            handleNameChange={handleNameChange}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={registerUser}
            />}
        />
        <Route 
          path='/signin' 
          element={
            <SignIn
            username={username} 
            password={password} 
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={login}
            />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;