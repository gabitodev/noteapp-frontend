import './app.css';
import { Routes, Route, } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Notification from './components/Notification';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Notes from './components/Notes';

const App = () => {
  return (
    <>
      <Navigation />
      <Notification />
      <Routes>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signin' element={<SignIn />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth home={true} />}>
            <Route path='/' element={<Home />}/>
          </Route>
        </Route>

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth home={false} />}>
            <Route path='/notes' element={<Notes />}/>
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;