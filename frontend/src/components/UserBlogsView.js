import { Container, ListItem, Typography, Avatar, ListItemAvatar, ListItemText, List } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const UserBlogsView = () => {
  const id = useParams().id;
  const blogs = useSelector(({ blogs }) => blogs.filter((b) => b.user.id === id));
  if (!blogs) return null;

  if (blogs.length > 0) {
    return (
      <>
        <Typography variant="h6">{blogs[0].user.name} blogs</Typography>
        <List>
          {blogs.map((blog, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>{index + 1}</Avatar>
              </ListItemAvatar>
              <ListItemText>{blog.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </>
    );
  } else {
    return (
      <Container>
        <Typography variant="p">No Blogs By user yet</Typography>
      </Container>
    );
  }
};
export default UserBlogsView;
