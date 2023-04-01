import notificationReducer from './reducers/notificationReducer.js';
import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogsReducer.js';
import loginReducer from './reducers/loginReducer.js';
import usersReducer from './reducers/usersReducer.js';
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    auth: loginReducer,
    users: usersReducer,
  },
});

export default store;
