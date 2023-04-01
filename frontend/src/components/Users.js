import { TableContainer, Table, TableBody, TableRow, Paper, TableCell, TableHead } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Users = () => {
  const allUsers = useSelector(({ users }) => users);
  return (
    <TableContainer component={Paper} style={{ margin: '16px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Users</TableCell>
            <TableCell>Blogs Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {user.blogs.length !== 0 ? (
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                ) : (
                  <p>{user.username}</p>
                )}
              </TableCell>
              <TableCell>{user.blogs.length !== 0 ? user.blogs.length : 'No Blogs Yet'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Users;
