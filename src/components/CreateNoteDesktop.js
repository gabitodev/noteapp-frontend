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
  background-color: #18181b;
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
  background-color: #18181b;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  outline: none;
`;

const SecondInput = styled.textarea`
  color: white;
  font-size: 1.125rem;
  line-height: 1.50rem;
  font-weight: 400;
  background-color: #18181b;
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
  width: 100%;
  background-color: #18181b;
  border-radius: 0 0 0.5rem 0.5rem;
  gap: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Button = styled.button`
  border-radius: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.50rem;
  font-weight: 700;
  padding: 0.4rem 0.3rem;
  transition: all 0.3s ease-in-out;
  width: 15%;
  &:hover {
    background-color: #27272a;
  }
`;

const CreateNoteDesktop = () => {
  const [isCreating, setIsCreating] = useState(true);
  const navigate = useNavigate();
  const { notes, setNotes } = useNotes();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const axiosPrivate = useAxiosPrivate();
  const { setNotification } = useNotification();

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const noteToCreate= {
      title,
      content,
    };
    try {
      const {data: createdNote} = await axiosPrivate.post('/', noteToCreate);
      setNotes(notes.concat(createdNote));
      setNotification({
        message: `Note '${createdNote.title}' created successfully 👍`,
        iseError: false,
      });
      setTimeout(() => setNotification(null), 5000);
      setTitle('');
      setContent('');
      setIsCreating(false);
      navigate('/notes');
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        iseError: true,
      });
      setTimeout(() => setNotification(null), 5000);
    };
  };

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
          <SecondInput
          type="text" 
          onKeyDown={handleKeyDown}
          cols='1' rows='2'
          onChange={({ target }) => setContent(target.value)}
          placeholder='Take a note...'
          value={content} />
          <ButtonDiv>
            <Button type='submit'>Save</Button>
            <Button type='button' onClick={() => setIsCreating(false)}>Cancel</Button>
          </ButtonDiv>
        </ShowDiv>
      </Form>
    </CreateNoteDiv>
  );
};

export default CreateNoteDesktop;