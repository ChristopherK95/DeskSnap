import { useContext, useEffect, useState } from 'react';
import { Container } from './Styles';
import Sidebar from '../sidebar/Sidebar';
import { SidebarContext } from '../sidebar/SidebarContext';
import StartPage from './start-page/StartPage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import NotificationProvider from '../../reusable/components/Notification/Notification';
import UserInfo from './user-info/UserInfo';
import ChannelPage from './channel-page/ChannelPage';
import { useQueryClient } from 'react-query';
import { socket } from '../../socket';
import useFetch, { fetchOnce } from '../hooks/useFetch';
import { Channel, User } from './start-page/types';

const HomePage = (props: { user: User }) => {
  // const a = useQuery('getChannels', () => axios.post('getChannels', {userId: }))
  const { activeChannel } = useContext(SidebarContext);
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useFetch<'channel', Channel[]>({
    action: 'channel/getChannelsOverview',
    payload: { user_id: props.user.id },
    key: 'channels-overview',
    options: { refetchOnWindowFocus: false },
  });

  const [channels, setChannels] = useState<Channel[]>([]);

  const findChannel = (item: Channel) => {
    return item._id === activeChannel.id;
  };

  useEffect(() => {
    if (data) {
      setChannels(data);
    }
  }, [data]);

  useEffect(() => {
    if (!props.user.id || channels.length === 0) {
      return;
    }

    queryClient.invalidateQueries('channels-overview');

    socket.connect();

    socket.on('connect', async () => {
      socket.emit('establish', props.user.username, channels);

      socket.on('receive_invite', () => {
        queryClient.invalidateQueries('get-invites');
      });

      socket.on('user_added', () => {
        queryClient.invalidateQueries('channels-overview');
      });

      socket.on('user_left', () => {
        queryClient.invalidateQueries('channels-overview');
      });
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  }, [props.user, channels]);

  if (!props.user.id) {
    return <></>;
  }

  return (
    <NotificationProvider>
      <Container>
        <Sidebar />
        {activeChannel.channelName === 'home' && (
          <StartPage userId={props.user.id} channels={channels} />
        )}
        {activeChannel.channelName === 'profile' && <UserInfo />}
        {activeChannel.channelName !== 'home' &&
          activeChannel.channelName !== 'profile' && (
            <ChannelPage channel={channels[channels.findIndex(findChannel)]} />
          )}
      </Container>
    </NotificationProvider>
  );
};

export default HomePage;
