import { useDispatch } from 'react-redux';
import { setNotif } from '../../slice/notifSlice';

/**
  msg -> Message to show up on notification
  time -> Time for notification to remain
  error -> Whether the notification is for showing an error message
**/
export default () => {
  const dispatch = useDispatch();

  const notify = (msg: string, time?: number, error?: boolean) =>
    dispatch(setNotif({ message: msg, time, error }));

  return notify;
};
