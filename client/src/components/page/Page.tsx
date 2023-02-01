import { useContext } from 'react';
import { Container, Content } from './Styles';
import VideoPlayer from '../video-player/VideoPlayer';
import Sidebar from '../sidebar/Sidebar';
import { SidebarContext } from '../sidebar/SidebarContext';
import StartPage from './start-page/StartPage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const HomePage = () => {
  // const a = useQuery('getChannels', () => axios.post('getChannels', {userId: }))
  const { activeChannel } = useContext(SidebarContext);
  const user = useSelector((state: RootState) => state.user);

  return (
    <Container>
      <Sidebar />
      {activeChannel === 'home' ? (
        <StartPage userId={user.id} />
      ) : (
        <Content>
          <VideoPlayer />
        </Content>
      )}
    </Container>
  );
};

export default HomePage;
