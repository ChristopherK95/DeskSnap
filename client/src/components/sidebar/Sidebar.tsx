import { useContext, useEffect, useState } from 'react';
import {
  StyledChannel,
  Container,
  Home,
  LogoutButton,
  Profile,
  CreateChannel,
  MiscContainer,
} from './Styles';
import HomeLogo from '../../svgs/Home';
import { SidebarContext } from './SidebarContext';
import Popup from '../popup/Popup';
import CreateChannelForm from './create-channel-form/CreateChannelForm';
import useFetch from '../hooks/useFetch';
import Channel from './channel/Channel';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Logout from './Logout/Logout';
import useUtil from './useUtil';
import Tooltip from '../tooltip/Tooltip';

interface ChannelType {
  _id: string;
  channel_name: string;
}

const Sidebar = () => {
  const { activeChannel, setActiveChannel } = useContext(SidebarContext);
  const [showPopup, setShowPopup] = useState(false);
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [channelName, setChannelName] = useState('');
  const [showTooltip, setShowTooltip] = useState<'create' | 'logout'>();

  const user = useSelector((state: RootState) => state.user);

  const { addChannel } = useUtil({ channelName, user, setErrorMessage });

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
        <CreateChannel
          onClick={() => setShowPopup(true)}
          onMouseEnter={() => setShowTooltip('create')}
          onMouseLeave={() => setShowTooltip(undefined)}
        >
          +
          <Tooltip
            direction={'right'}
            value={'Create channel'}
            visible={showTooltip === 'create'}
          />
        </CreateChannel>
      </StyledChannel>
      <MiscContainer>
        <LogoutButton
          onMouseEnter={() => setShowTooltip('logout')}
          onMouseLeave={() => setShowTooltip(undefined)}
        >
          <Logout />
          <Tooltip
            direction={'right'}
            value={'Logout'}
            visible={showTooltip === 'logout'}
          />
        </LogoutButton>
      </MiscContainer>
      {showPopup && (
        <Popup
          onClose={() => {
            setShowPopup(false);
            setChannelName('');
          }}
          onConfirm={() => {
            addChannel();
            setChannelName('');
          }}
          showPopup={showPopup}
        >
          <CreateChannelForm
            user={user}
            channelName={channelName}
            errorMessage={errorMessage}
            setActiveChannel={(id: string) => setActiveChannel(id)}
            setChannelName={setChannelName}
            onKeyEnter={() => {
              addChannel();
              setChannelName('');
              setShowPopup(false);
            }}
          />
        </Popup>
      )}
    </Container>
  );
};

export default Sidebar;
