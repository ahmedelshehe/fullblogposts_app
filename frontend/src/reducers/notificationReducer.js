import { createSlice } from '@reduxjs/toolkit';

const initialState = null;
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    newNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return null;
    },
  },
});
export const setNotification = ({ message, type, time }) => {
  return async (dispatch) => {
    dispatch(newNotification({ message, type }));
    setTimeout(() => dispatch(removeNotification()), time * 1000);
  };
};
export default notificationSlice.reducer;
export const { newNotification, removeNotification } = notificationSlice.actions;
