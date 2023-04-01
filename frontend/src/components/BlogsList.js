import { useSelector } from 'react-redux';
import Blog from './Blog.js';
const BlogsList = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  return (
    blogs.length > 0 &&
    blogs.map((blog) => {
      return <Blog key={blog.id} blog={blog} />;
    })
  );
};
export default BlogsList;
