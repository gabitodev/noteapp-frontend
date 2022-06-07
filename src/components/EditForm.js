import { useState } from 'react';
import useNotes from '../hooks/useNotes';
import { keyframes } from 'styled-components';
import styled from 'styled-components';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

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
  z-index: 0;
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
  background-color: #171717;
  position: static;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 10rem;
  color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  gap: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  transition: all 0.3s ease-in-out;
  border: 1px solid #fbbf24;
  animation: ${width} 0.5s linear 1;
  @media (min-width: 640px) {
    width: 25%;
  }
`;

const Input = styled.input`
  color: white;
  background-color: #171717;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

const TextArea = styled.textarea`
  color: white;
  background-color: #171717;
`;

const EditForm = ({ note, setIsEditing }) => {
  const [inputTitle, setInputTitle] = useState(note.title);
  const [inputContent, setInputContent] = useState(note.content);
  const axiosPrivate = useAxiosPrivate();
  const { notes, setNotes } = useNotes();
  
  const handleEdit = async (event, id) => {
    event.preventDefault();
    const noteToEdit = {
      title: inputTitle,
      content: inputContent,
    };
    const {data: editedNote} = await axiosPrivate.put(id, noteToEdit);
    setNotes(notes.map(note => note.id !== id ? note : editedNote));
    setIsEditing(false);
  }

  const handleCancel = () => {
    setInputTitle(note.title);
    setInputContent(note.content);
    setIsEditing(false);
  };
  return (
    <EditDiv>
      <Form onSubmit={(event) => handleEdit(event, note.id)}>
        <Input type="text" value={inputTitle} onChange={({ target }) => setInputTitle(target.value)} />
        <TextArea name="content" id="" cols="30" rows="5" value={inputContent} onChange={({ target }) => setInputContent(target.value)}></TextArea>
        <button type='submit'>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </Form>
    </EditDiv>
  );
}
export default EditForm;