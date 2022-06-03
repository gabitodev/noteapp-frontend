import './app.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useState } from 'react';
import styled from 'styled-components';


const NotificationDiv = styled.div`
  position: absolute;
  top: 2em;
  left: 0;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 1;
`;

const Text = styled.div`
  background-color: ${props => props.isError ? '#fca5a5' : '#d5eddb'};
  color: ${props => props.isError ? '#dc2626' : '#22c55e'};
  padding: 1rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-align: center;
  border-radius: 0.5rem;
  @media (min-width: 768px) {
    width: 75%;
    margin-right: auto;
    margin-left: auto;
  }
  @media (min-width: 768px) {
    width: 25%;
    margin-right: 0;
    margin-left: auto;
  }
`;

const Notification = ({ notification }) => {
  if (!notification) return null;

  return (
    <NotificationDiv>
      <Text isError={notification.isError}>{notification.message}</Text>
    </NotificationDiv>
  );
}


function App() {
  const [notification, setNotification] = useState(null);
  return (
    <>
      <Navigation />
      <Notification notification={notification} />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp setNotification={setNotification}/>}/>
      </Routes>
      <Footer />
    </>
  );
};

export default App;