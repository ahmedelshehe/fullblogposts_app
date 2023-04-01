import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';
const Notification = () => {
  const notification = useSelector(({ notification }) => notification);
  if (notification === null) {
    return null;
  }
  return (
    <div style={{ margin: '16px' }}>
      <Alert severity={notification.type}>{notification.message}</Alert>
    </div>
  );
};
export default Notification;
