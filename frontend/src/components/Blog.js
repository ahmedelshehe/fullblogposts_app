import PropTypes from 'prop-types';

import { Card, Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
const Blog = ({ blog }) => {
  return (
    <Grid item xs={12}>
      <Card className="blog" style={{ marginTop: '8px', marginBottom: '8px', padding: '8px' }}>
        <Grid item xs={11}>
          <Grid container>
            <Grid item xs={11}>
              <Typography variant="h6">{blog.title}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Button>
                <Link to={`blogs/${blog.id}`}>view</Link>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Typography variant="p">
          <strong>By</strong>&nbsp; {blog.author}
        </Typography>
      </Card>
    </Grid>
  );
};
Blog.prototype = {
  blog: PropTypes.object.isRequired,
  Card,
};
export default Blog;
