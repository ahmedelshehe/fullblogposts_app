import { useField } from './../customHooks.js';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer.js';
import { loginUser } from '../reducers/loginReducer.js';
import Togglable from './Togglable.js';
import { FormControl, FormGroup, InputLabel, Input, Button, Typography, Container } from '@mui/material';
const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField('text');
  const password = useField('password');
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginUser({ username: username.value, password: password.value }));
      username.clear();
      password.clear();
    } catch (exception) {
      dispatch(setNotification({ type: 'error', message: exception, time: 5 }));
    }
  };
  return (
    <>
      <Container style={{ textAlign: 'center', width: '50%', height: '50%' }}>
        <form onSubmit={handleLogin}>
          <FormGroup>
            <Typography variant="h6">Log in to application</Typography>
            <FormControl style={{ margin: '16px' }}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" type={username.type} value={username.value} onChange={username.onChange} />
            </FormControl>
            <FormControl style={{ margin: '16px' }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" type={password.type} value={password.value} onChange={password.onChange} />
            </FormControl>
            <Button id="login-button" type="submit">
              login
            </Button>
          </FormGroup>
        </form>
      </Container>
    </>
  );
};
export default LoginForm;
