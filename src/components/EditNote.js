import { useState } from 'react';
import { keyframes } from 'styled-components';
import styled from 'styled-components';
import useNotes from '../hooks/useNotes';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useNotification from '../hooks/useNotification';
import { useNavigate, useParams } from 'react-router-dom';

const width = keyframes`
  from {
    width: 15%;
    opacity: 0;
  }

  to {
    widh: 100%;
    opacity: 1;
  }
`;

const opacity = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const EditDiv = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.64);
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  color: white;
  animation: ${opacity} 0.5s linear 1;
`;

const Form = styled.form`
  background-color: #374151;
  position: static;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 10rem;
  color: white;
  border-radius: 0.5rem;
  padding: 0.7rem 1rem;
  gap: 1rem;
  max-height: 20rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  transition: all 0.3s ease-in-out;
  border: 1px solid #fbbf24;
  animation: ${width} 0.5s linear 1;
  @media (min-width: 640px) {
    width: 75%;
    max-width: 80rem;
  }
  @media (min-width: 1024px) {
    width: 50%;
    max-width: 80rem;
  }
  @media (min-width: 1440px) {
    width: 35%;
    max-width: 80rem;
  }
`;

const Input = styled.input`
  color: white;
  background-color: #374151;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
  outline: none;
`;

const TextArea = styled.textarea`
  color: white;
  font-weight: 400;
  background-color: #374151;
  white-space: pre-wrap;
  word-wrap: break-word;
  resize: none;
  outline: none;
`;

const ButtonDiv = styled.div`
  width: 100%;
  background-color: #374151;
  gap: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;


const Button = styled.button`
  border-radius: 0.5rem;
  padding: 0.4rem 0.3rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #4b5563;
  }
  @media (min-width: 640px) {
    width: 15%;
  }
`;

const EditNote = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const { notes, setNotes } = useNotes();
  const note = notes.find(note => note.id === id);

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const axiosPrivate = useAxiosPrivate();
  const { setNotification } = useNotification();
  
  const handleEdit = async (event, id) => {
    event.preventDefault();
    const noteToEdit = {
      title,
      content,
    };

    try {
      const {data: editedNote} = await axiosPrivate.put(id, noteToEdit);
      setNotes(notes.map(note => note.id !== id ? note : editedNote));
      setNotification({
        message: `Note '${editedNote.title}' edited successfully 👍`,
        iseError: false,
      });
      setTimeout(() => setNotification(null), 5000);
      navigate('/notes');
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        iseError: true,
      });
      setTimeout(() => setNotification(null), 5000);
    };
  };

  const handleCancel = () => {
    setTitle(note.title);
    setContent(note.content);
    navigate('/notes')
  };

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  
  return (
    <EditDiv>
      <Form onSubmit={(event) => handleEdit(event, note.id)}>
        <Input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        <TextArea name="content" id="content" onKeyDown={handleKeyDown} cols="10" rows="3" value={content} onChange={({ target }) => setContent(target.value)}></TextArea>
        <ButtonDiv>
          <Button type='submit'>Save</Button>
          <Button type='button' onClick={handleCancel}>Cancel</Button>
        </ButtonDiv>
      </Form>
    </EditDiv>
  );
}
export default EditNote;