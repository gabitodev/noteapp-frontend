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

import styled from 'styled-components';

const Container = styled.div`
  min-height: calc(100% - 4rem);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-top: 1rem;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const NoteContainer = styled.div`
  background-color: #171717;
  width: 100%;
  min-height: 10rem;
  color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  @media (min-width: 640px) {
    width: 25%;
  }
`;

const NoteTitle = styled.h3`
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

const Note = ({ note }) => {
  return (
    <NoteContainer>
      <NoteTitle>{note.title}</NoteTitle>
      <p>{note.content}</p>
    </NoteContainer>
  );
};

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
    <Container>
      {notes.map(note =>
        <Note key={note.id} note={note}/>
      )}
    </Container>
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