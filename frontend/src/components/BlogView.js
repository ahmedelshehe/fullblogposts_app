import {
  Button,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Paper,
  TableCell,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogsReducer.js';
import { useField } from '../customHooks.js';
const BlogView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);
  const user = useSelector(({ auth }) => auth);
  const comment = useField('text');
  if (!user || !blogs || !blog) return null;

  const owner = blog.user.username === user.username;
  const handleLikeBlog = async () => {
    const newLikes = blog.likes + 1;
    const newBlog = {
      ...blog,
      likes: newLikes,
      user: blog.user.id,
    };
    try {
      dispatch(likeBlog(newBlog, blog.id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      if (window.confirm('Are you sure you want to delete')) {
        dispatch(deleteBlog(blog.id));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      dispatch(commentBlog(comment.value, blog.id));
      comment.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Typography align="center" variant="h3">
        {blog.title}
      </Typography>
      <TableContainer component={Paper} style={{ margin: '16px' }}>
        <Table>
          <TableBody className="details">
            <TableRow>
              <TableCell>Author</TableCell>
              <TableCell>{blog.author}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Url</TableCell>
              <TableCell>{blog.url}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Likes</TableCell>
              <TableCell>{blog.likes}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Button className="likeButton" onClick={handleLikeBlog}>
                  like
                </Button>
                {owner ? (
                  <Button className="removeButton" onClick={handleDelete}>
                    remove
                  </Button>
                ) : null}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Container style={{ display: 'flex', gap: '1rem' }}>
        <Card style={{ width: '48%', margin: '8px' }}>
          {blog.comments.length > 0 ? (
            <>
              <Typography align="center" variant="h6">
                Comments
              </Typography>
              <List>
                {blog.comments.map((comment, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>{index + 1}</Avatar>
                    </ListItemAvatar>
                    <ListItemText>{comment}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <Typography align="center" style={{ marginTop: '16px' }} variant="h6">
              No Comments Yet
            </Typography>
          )}
        </Card>
        <Card style={{ width: '48%', margin: '8px', height: '30%' }}>
          <Typography align="center" variant="h6">
            Add Comments
          </Typography>
          <form onSubmit={handleAddComment}>
            <FormGroup>
              <FormControl style={{ margin: '8px' }}>
                <InputLabel htmlFor="comment">Comment</InputLabel>
                <Input
                  id="comment"
                  type={comment.type}
                  name="comment"
                  value={comment.value}
                  onChange={comment.onChange}
                />
              </FormControl>
              <Button type="submit">Add</Button>
            </FormGroup>
          </form>
        </Card>
      </Container>
    </Container>
  );
};
export default BlogView;
