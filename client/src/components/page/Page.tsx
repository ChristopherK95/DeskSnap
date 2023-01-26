import { useContext, useState } from 'react';
import { Container, Content } from './Styles';
import VideoPlayer from '../video-player/VideoPlayer';
import Sidebar from '../sidebar/Sidebar';
import useFetch from '../hooks/useFetch';
import LoginPage from './login-page/LoginPage';
import { SidebarContext } from '../sidebar/SidebarContext';
import StartPage from './start-page/StartPage';

const HomePage = () => {
  // const a = useQuery('getChannels', () => axios.post('getChannels', {userId: }))
  const { activeChannel } = useContext(SidebarContext);
  const [user, setUser] = useState<{ id: string; name: string }>();
  const [channels, setChannels] = useState<{ id: string; name: string }[]>([
    { id: '0', name: 'Basse' },
    { id: '1', name: 'Victor' },
    { id: '2', name: 'Christopher' },
  ]);

  const fetch = useFetch();
  // const data = fetch({ route: 'channel', action: 'getChannels' });

  if (!user) {
    return <LoginPage setUser={setUser} />;
  }

  return (
    <Container>
      <Sidebar channels={channels} />
      {activeChannel === 'home' ? (
        <StartPage />
      ) : (
        <Content>
          <VideoPlayer />
        </Content>
      )}
    </Container>
  );
};

export default HomePage;
