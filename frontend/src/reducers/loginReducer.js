import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login.js';
import blogsService from '../services/blogs.js';
const initialState = null;

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, payload) {
      return payload.payload;
    },
    auth(state, payload) {
      return payload.payload;
    },
    logout(state, payload) {
      return null;
    },
  },
});
export const loginUser = (credintials) => {
  return async (dispatch) => {
    const user = await loginService.login(credintials);
    dispatch(login(user));
    window.localStorage.setItem('loggedInUser', JSON.stringify(user));
    blogsService.setToken(user.token);
  };
};
export const authUser = (user) => {
  return (dispatch) => {
    dispatch(auth(user));
    blogsService.setToken(user.token);
  };
};
export const logoutUser = () => {
  blogsService.setToken(null);
  return (dispatch) => {
    dispatch(logout());
  };
};
export default loginSlice.reducer;
export const { login, logout, auth } = loginSlice.actions;
