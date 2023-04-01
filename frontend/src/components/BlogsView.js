import CreateBlogForm from './CreateBlogForm.js';
import BlogsList from './BlogsList.js';
import { Grid } from '@mui/material';
const BlogsView = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <CreateBlogForm />
      </Grid>
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <BlogsList />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default BlogsView;
