import { useEffect } from 'react';
import Notification from './components/Notification.js';
import LoginForm from './components/LoginForm.js';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer.js';
import { authUser } from './reducers/loginReducer.js';
import BlogsView from './components/BlogsView.js';
import { getAllUsers } from './reducers/usersReducer.js';
import Users from './components/Users.js';
import BlogView from './components/BlogView.js';
import { AppBar, Container, Button, Toolbar, Typography } from '@mui/material';
import { logoutUser } from './reducers/loginReducer.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserBlogsView from './components/UserBlogsView.js';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      dispatch(authUser(user));
    }
    dispatch(initializeBlogs());
    dispatch(getAllUsers());
  }, [dispatch]);
  const user = useSelector(({ auth }) => auth);
  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(logoutUser());
  };

  return (
    <Router>
      <Container>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Container style={{ display: 'flex', gap: '1rem' }}>
              <Container>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Button color="inherit">
                    <Typography variant="h4" color={'InfoText'}>
                      Blogs
                    </Typography>
                  </Button>
                </Link>
                <Link to="/users" style={{ textDecoration: 'none', color: 'greenyellow' }}>
                  <Button color="inherit">
                    <Typography variant="p" color={'InfoText'}>
                      Users
                    </Typography>
                  </Button>
                </Link>
              </Container>
              {user && (
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Typography variant="h6" color={'InfoText'} align="center">
                    {user.name}
                  </Typography>
                  <Button color="inherit" onClick={handleLogout}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                      Logout
                    </Link>
                  </Button>
                </div>
              )}
            </Container>
          </Toolbar>
        </AppBar>
        <Notification />
        <Container style={{ marginTop: 8 }}>
          <Routes>
            <Route path="/users" element={user ? <Users /> : <LoginForm />} />
            <Route path="/" element={user ? <BlogsView /> : <LoginForm />} />
            <Route path="/blogs/:id" element={user ? <BlogView /> : <LoginForm />} />
            <Route path="/users/:id" element={user ? <UserBlogsView /> : <LoginForm />} />
          </Routes>
        </Container>
      </Container>
    </Router>
  );
};

export default App;
