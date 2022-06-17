import { useState } from 'react';
import styled from 'styled-components';
import useNotes from '../hooks/useNotes';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useNotification from '../hooks/useNotification';
import { useNavigate } from 'react-router-dom';

const CreateNoteDiv = styled.div`
  display: none;
  width: 100%;
  flex-grow: 1;
  color: white;
  position: relative;
  display: none;
  max-height: 20rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 640px) {
    display: flex;
  }
`;

const Form = styled.form`
  background-color: #374151;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 20rem;
  justify-content: space-between;
  border-radius: 0.5rem;
  padding: 0.7rem 1rem;
  color: white;
`;

const CreateNoteInput = styled.input`
  width: 100%;
  background-color: #374151;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  outline: none;
`;

const ContentTexArea = styled.textarea`
  color: white;
  font-size: 1.125rem;
  line-height: 1.50rem;
  font-weight: 400;
  background-color: #374151;
  white-space: pre-wrap;
  word-wrap: break-word;
  resize: none;
  outline: none;
`;

const ShowDiv = styled.div`
  width: 100%;
  max-height: 14rem;
  display: ${props => props.isCreating ? 'flex' : 'none'};
  flex-direction: column;
  gap: 1rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

const BottomDiv = styled.div `
  width: 100%;
  background-color: #374151;
  border-radius: 0 0 0.5rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  border-radius: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.50rem;
  font-weight: 700;
  padding: 0.4rem 0.8rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #4b5563;
  }
`;

const CategoryInput = styled.input`
  font-size: 1.125rem;
  line-height: 1.50rem;
  font-weight: 400;
  background-color: #374151;
  outline: none;
`;

const CreateNoteDesktop = () => {
  // States
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  // Hooks
  const navigate = useNavigate();
  const { notes, setNotes } = useNotes();
  const axiosPrivate = useAxiosPrivate();
  const { setNotification } = useNotification();

  // Handlers
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const noteToCreate= {
      title,
      content,
      category
    };
    try {
      const {data: createdNote} = await axiosPrivate.post('/', noteToCreate);
      setNotes(notes.concat(createdNote));
      setTitle('');
      setContent('');
      setCategory('');
      setIsCreating(false);
      navigate('/notes');
      setNotification({
        message: `Note '${createdNote.title}' created successfully 👍`,
        iseError: false,
      });
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        iseError: true,
      });
      setTimeout(() => setNotification(null), 5000);
    };
  };

  // Component
  return (
    <CreateNoteDiv>
      <Form onSubmit={handleCreate}>
        <CreateNoteInput
        type="text"
        isCreating={isCreating}
        onClick={() => setIsCreating(true)}
        onChange={({ target }) => setTitle(target.value)}
        placeholder={isCreating ? 'Title' : 'Take a note...'}
        value={title} />
        <ShowDiv isCreating={isCreating}>
          <ContentTexArea
          type="text" 
          onKeyDown={handleKeyDown}
          cols='1' rows='2'
          onChange={({ target }) => setContent(target.value)}
          placeholder='Take a note...'
          value={content} />
          <BottomDiv>
            <CategoryInput type="text" placeholder='Category' value={category} onChange={({ target }) => setCategory(target.value)} />
            <ButtonDiv>
              <Button type='submit'>Save</Button>
              <Button type='button' onClick={() => setIsCreating(false)}>Cancel</Button>
            </ButtonDiv>
          </BottomDiv>
        </ShowDiv>
      </Form>
    </CreateNoteDiv>
  );
};

export default CreateNoteDesktop;