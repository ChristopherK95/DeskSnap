import { useContext, useEffect, useState } from 'react';
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

  if (!user) {
    return <LoginPage setUser={(user) => setUser(user)} />;
  }

  return (
    <Container>
      <Sidebar user={user} />
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
