import { useQueryClient } from 'react-query';
import { fetchOnce } from '../hooks/useFetch';

export default (props: {
  channelName: string;
  user: { id: string; username: string };
  setErrorMessage: (err: string) => void;
}) => {
  const { channelName, user, setErrorMessage } = props;
  const queryClient = useQueryClient();

  const addChannel = async () => {
    if (channelName.length > 15) return;
    if (channelName.length < 3) return;
    const channel = await fetchOnce<
      'channel',
      { response: { _id: string; channel_name: string }; message: string }
    >({
      route: 'channel',
      action: 'createChannel',
      payload: { channel_name: channelName, user_id: user.id },
    });
    if (channel.status === 204 || channel.status === 200) {
      queryClient.invalidateQueries('channels-overview');
      queryClient.invalidateQueries('sidebar-channels');
    }
    if (channel.status === 500) {
      setErrorMessage(channel.data.message);
    }
  };

  return {
    addChannel,
  };
};
