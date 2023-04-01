import { createSlice } from '@reduxjs/toolkit';
import blogs from '../services/blogs.js';
import blogsService from '../services/blogs.js';
const initialState = [];
const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    appendBlog(state, action) {
      return state.concat(action.payload).sort((a, b) => (a.likes < b.likes ? 1 : -1));
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => (a.likes < b.likes ? 1 : -1));
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload).sort((a, b) => (a.likes < b.likes ? 1 : -1));
    },
    updateBlogs(state, action) {
      console.log(state);
      return state
        .map((b) => (b.id === action.payload.id ? action.payload : b))
        .sort((a, b) => (a.likes < b.likes ? 1 : -1));
    },
  },
});

export const createBlog = ({ blog, user }) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(blog);
    dispatch(appendBlog({ ...newBlog, user }));
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};
export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogsService.remove(id);
    dispatch(removeBlog(id));
  };
};
export const likeBlog = (likedBlog, id) => {
  return async (dispatch) => {
    const blog = await blogsService.update(likedBlog, id);
    dispatch(updateBlogs(blog));
  };
};
export const commentBlog = (comment, id) => {
  return async (dispatch) => {
    const blog = await blogsService.comment(comment, id);
    dispatch(updateBlogs(blog));
  };
};
export default blogsSlice.reducer;
export const { appendBlog, setBlogs, removeBlog, updateBlogs } = blogsSlice.actions;
