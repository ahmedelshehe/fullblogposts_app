import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Togglable from './Togglable.js';
import { setNotification } from '../reducers/notificationReducer.js';
import { createBlog } from '../reducers/blogsReducer.js';
import { FormControl, Input, InputLabel, Button, FormGroup, Container, Card } from '@mui/material';
const CreateBlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth);
  const blogFormRef = useRef();

  const handleCreateBlog = (event) => {
    event.preventDefault();
    try {
      blogFormRef.current.toggleVisibility();
      dispatch(
        createBlog({
          blog: { title, author, url },
          user: {
            username: user.username,
            name: user.name,
          },
        })
      );
      dispatch(
        setNotification({ type: 'success', message: `a new blog  ${title} by ${user.name} is added`, time: 10 })
      );
    } catch (error) {
      setNotification({ type: 'error', message: error, time: 5 });
    }
    setTitle('');
    setAuthor('');
    setUrl('');
  };
  return (
    <Card>
      <Togglable viewButtonLabel="Add New Blog" ref={blogFormRef}>
        <h2>Create new</h2>
        <form onSubmit={handleCreateBlog} style={{ marginRight: '16px' }}>
          <FormGroup>
            <FormControl>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input
                id="title"
                type="text"
                name="title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </FormControl>
            <FormControl style={{ marginTop: '12px' }}>
              <InputLabel htmlFor="author">Author</InputLabel>
              <Input
                id="author"
                type="text"
                name="author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </FormControl>
            <FormControl style={{ marginTop: '12px' }}>
              <InputLabel htmlFor="url">Url</InputLabel>
              <Input id="url" type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)} />
            </FormControl>
          </FormGroup>
          <FormControl>
            <Button type="submit" id="create-button">
              create
            </Button>
          </FormControl>
        </form>
      </Togglable>
    </Card>
  );
};

export default CreateBlogForm;
