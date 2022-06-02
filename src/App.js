import './app.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
      <Footer />
    </>
  );
};

export default App;