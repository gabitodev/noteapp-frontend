import './app.css';
import { Routes, Route, } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Notification from './components/Notification';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Notes from './components/Notes';
import EditNote from './components/EditNote';

const App = () => {
  return (
    <>
      <Navigation />
      <Notification />
      <Routes>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signin' element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth home={true} />}>
            <Route path='/' element={<Home />}/>
          </Route>
        </Route>

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth home={false} />}>
            <Route path='/notes' element={<Notes />}>
              <Route path=':id' element={<EditNote />}/>
            </Route>
          </Route>
        </Route>
        
      </Routes>
      <Footer />
    </>
  );
};

export default App;