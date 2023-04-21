import { useContext, useEffect } from 'react';
import { Container, Content } from './Styles';
import Sidebar from '../sidebar/Sidebar';
import { SidebarContext } from '../sidebar/SidebarContext';
import StartPage from './start-page/StartPage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import NotificationProvider from '../../reusable/components/Notification/Notification';
import { useDispatch } from 'react-redux';
import { setNotif } from '../../slice/notifSlice';
import UserInfo from './user-info/UserInfo';
import ChannelPage from './channel-page/ChannelPage';
import { useQueryClient } from 'react-query';
import { socket } from '../../socket';
import { createContext } from 'react';
import { fetchOnce } from '../hooks/useFetch';

const HomePage = () => {
  // const a = useQuery('getChannels', () => axios.post('getChannels', {userId: }))
  const { activeChannel } = useContext(SidebarContext);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   dispatch(setNotif({ message: 'Logged in!' }));
  // }, []);

  const getUserChannels = async () => {
    return await fetchOnce<'channel'>({
      action: 'channel/getChannels',
      payload: { user_id: user.id },
    });
  };

  useEffect(() => {
    if (!user.id) {
      return;
    }

    socket.connect();

    socket.on('connect', async () => {
      const channels = await getUserChannels();
      console.log(channels.data);
      socket.emit('establish', user.username, channels.data);
      socket.on('receive_invite', () => {
        queryClient.invalidateQueries('get-invites');
      });
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  }, [user]);

  if (!user.id) {
    return <></>;
  }

  return (
    <NotificationProvider>
      <Container>
        <Sidebar />
        {activeChannel === 'home' && <StartPage userId={user.id} />}
        {activeChannel === 'profile' && <UserInfo />}
        {activeChannel !== 'home' && activeChannel !== 'profile' && (
          <ChannelPage />
        )}
      </Container>
    </NotificationProvider>
  );
};

export default HomePage;
