import { useState } from 'react';
import { keyframes } from 'styled-components';
import styled from 'styled-components';
import useNotes from '../hooks/useNotes';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useNotification from '../hooks/useNotification';
import { useNavigate } from 'react-router-dom';

const opacity = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const CreateDiv = styled.div`
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
  @media (min-width: 640px) {
    display: none;
  }
`;

const Form = styled.form`
  background-color: #374151;
  position: static;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 10rem;
  max-height: 60%;
  color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  gap: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  transition: all 0.3s ease-in-out;
  border: 1px solid #fbbf24;
`;

const TitleInput = styled.input`
  color: white;
  background-color: #374151;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
  outline: none;
`;

const ContentTexArea = styled.textarea`
  color: white;
  background-color: #374151;
  white-space: pre-wrap;
  word-wrap: break-word;
  resize: none;
  outline: none;
`;

const BottomDiv = styled.div `
  width: 100%;
  background-color: #374151;
  border-radius: 0 0 0.5rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryInput = styled.input`
  font-weight: 700;
  color: #818cf8;
  background-color: #374151;
  outline: none;
`;

const SaveButton = styled.button`
  font-weight: 700;
  border-radius: 0.5rem;
  padding: 0.4rem 0.8rem;
  @media (hover: none) and (pointer: coarse) {
    &:active {
      background-color: #4b5563;
    }
  }
`;

const CreateNoteMobile = () => {
  // States
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  // Hooks
  const navigate = useNavigate();
  const { notes, setNotes } = useNotes();
  const axiosPrivate = useAxiosPrivate();
  const { setNotification } = useNotification();

  // Handlers
  const handleCreate = async (event) => {
    event.preventDefault();
    const noteToCreate= {
      title,
      content,
      category
    };
    try {
      const { data: createdNote } = await axiosPrivate.post('/', noteToCreate);
      setNotes(notes.concat(createdNote));
      setNotification({
        message: `Note '${createdNote.title}' created successfully ????`,
        iseError: false,
      });
      setTimeout(() => setNotification(null), 3000);
      navigate('/notes');
      setTitle('');
      setContent('');
      setCategory('');
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        iseError: true,
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Component
  return (
    <CreateDiv>
      <Form onSubmit={handleCreate}>
        <TitleInput type="text" value={title} placeholder='Title' onChange={({ target }) => setTitle(target.value)} />
        <ContentTexArea
          onKeyDown={handleKeyDown}
          name="content"
          cols="1"
          rows="4"
          placeholder='Take a note...'
          value={content}
          onChange={({ target }) => setContent(target.value)} />
        <BottomDiv>
          <CategoryInput type="text" placeholder='Category' value={category} onChange={({ target }) => setCategory(target.value)} />
          <SaveButton type='submit'>Save</SaveButton>
        </BottomDiv>
      </Form>
    </CreateDiv>
  );
};
export default CreateNoteMobile;