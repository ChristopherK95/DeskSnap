import { useQueryClient } from 'react-query';
import { fetchOnce } from '../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { setNotif } from '../../slice/notifSlice';

export default (props: {
  channelName: string;
  user: { id: string; username: string };
  setErrorMessage: (err: string) => void;
}) => {
  const { channelName, user, setErrorMessage } = props;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const addChannel = async () => {
    if (channelName.length > 15) return;
    if (channelName.length < 3) return;
    const channel = await fetchOnce<
      'channel',
      { response: { _id: string; channel_name: string }; message: string }
    >({
      action: 'channel/createChannel',
      payload: { channel_name: channelName, user_id: user.id },
    });
    if (channel.status === 204 || channel.status === 200) {
      dispatch(setNotif({ message: 'Channel created!' }));
      queryClient.invalidateQueries('channels-overview');
      queryClient.invalidateQueries('sidebar-channels');
    }
    if (channel.status === 500) {
      dispatch(setNotif({ message: 'Failed to create channel!', error: true }));
      setErrorMessage(channel.data.message);
    }
  };

  return {
    addChannel,
  };
};
