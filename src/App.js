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
  left: 0;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Text = styled.div`
  background-color: ${props => props.notification.isPositive ? '#d5eddb' : '#ef4444'};
`;

const Notification = ({ notification }) => {
  if (!notification) return null;

  return (
    <NotificationDiv>
      <Text notification={notification}>{notification.message}</Text>
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