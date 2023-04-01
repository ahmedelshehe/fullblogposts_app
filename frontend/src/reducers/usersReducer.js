import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users.js';
const initialState = [];
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getAll(state, action) {
      return action.payload;
    },
  },
});

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(getAll(users));
  };
};
export default usersSlice.reducer;
export const { getAll } = usersSlice.actions;
