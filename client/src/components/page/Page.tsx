import { useContext, useEffect } from 'react';
import { Container, Content } from './Styles';
import VideoPlayer from '../video-player/VideoPlayer';
import Sidebar from '../sidebar/Sidebar';
import { SidebarContext } from '../sidebar/SidebarContext';
import StartPage from './start-page/StartPage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import NotificationProvider from '../../reusable/components/Notification/Notification';
import { useDispatch } from 'react-redux';
import { setNotif } from '../../slice/notifSlice';
import UserInfo from './user-info/UserInfo';

const HomePage = () => {
  // const a = useQuery('getChannels', () => axios.post('getChannels', {userId: }))
  const { activeChannel } = useContext(SidebarContext);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setNotif({ message: 'Logged in!' }));
  // }, []);

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
          <Content>
            <VideoPlayer />
          </Content>
        )}
      </Container>
    </NotificationProvider>
  );
};

export default HomePage;
