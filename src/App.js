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
import { useEffect, useState } from 'react';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import notesService from './services/notes';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  
  useEffect(() => {
    const getNotes = async () => {
      const notes = await notesService.getNotesOfUser();
      setNotes(notes);
    }

    getNotes();
  }, [axiosPrivate]);
  
  return (
    <div>
      {notes.map(note => <p key={note.id}>{note.title}</p> )}
    </div>
  );
}


const App = () => {
  return (
    <>
      <Navigation />
      <Notification />
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signin' element={<SignIn />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path='/' element={<Notes />}/>
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;