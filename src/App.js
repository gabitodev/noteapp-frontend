import './app.css';
import { Routes, Route, } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Notification from './components/Notification';

const App = () => {
  return (
    <>
      <Navigation />
      <Notification />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signin' element={<SignIn />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;