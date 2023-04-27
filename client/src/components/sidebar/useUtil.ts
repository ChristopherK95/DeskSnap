import { useQueryClient } from 'react-query';
import { fetchOnce } from '../hooks/useFetch';
import useNotify from '../../reusable/hooks/use-notify';

export default (props: {
  channelName: string;
  user: { id: string; username: string };
}) => {
  const { channelName, user } = props;
  const queryClient = useQueryClient();
  const notify = useNotify();

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
    if (
      channel.status === 204 ||
      channel.status === 200 ||
      channel.status === 201
    ) {
      notify('Channel created!');
      queryClient.invalidateQueries('channels-overview');
      queryClient.invalidateQueries('sidebar-channels');
    }
    if (channel.status === 500) {
      notify(`Failed to create channel! ${channel.data.message}`, undefined, true);
    }
  };

  return {
    addChannel,
  };
};
