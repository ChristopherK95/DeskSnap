import { useContext, useEffect, useState } from 'react';
import { StyledChannel, Container, Home, MiscContainer } from './Styles';
import HomeLogo from '../../svgs/Home';
import { SidebarContext } from './SidebarContext';
import useFetch from '../hooks/useFetch';
import Channel from './channel/Channel';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Logout from './Logout/Logout';
import CreateChannel from './create-channel/CreateChannel';

interface ChannelType {
  _id: string;
  channel_name: string;
}

const Sidebar = () => {
  const { activeChannel, setActiveChannel } = useContext(SidebarContext);
  const [channels, setChannels] = useState<ChannelType[]>([]);

  const user = useSelector((state: RootState) => state.user);

  const { data } = useFetch<'channel', { _id: string; channel_name: string }[]>(
    {
      action: 'channel/getChannels',
      key: 'sidebar-channels',
      options: { refetchOnWindowFocus: false },
      payload: { user_id: user?.id },
    },
  );

  useEffect(() => {
    if (data) {
      setChannels(data);
    }
  }, [data]);

  if (!user.id) {
    return <></>;
  }
  return (
    <Container>
      <StyledChannel selected={activeChannel === 'home'}>
        <Home
          selected={activeChannel === 'home'}
          onClick={() => setActiveChannel('home')}
        >
          <HomeLogo />
        </Home>
      </StyledChannel>
      {channels.map((c, i) => (
        <Channel key={i} idx={i} channel={c} />
      ))}
      <StyledChannel>
        <CreateChannel setActiveChannel={setActiveChannel} user={user} />
      </StyledChannel>
      <MiscContainer>
        <Logout />
      </MiscContainer>
    </Container>
  );
};

export default Sidebar;
