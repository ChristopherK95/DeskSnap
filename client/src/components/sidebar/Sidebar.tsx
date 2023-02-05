import { useContext, useEffect, useState } from 'react';
import {
  AddChannel,
  StyledChannel,
  Container,
  Home,
  LogoutButton,
} from './Styles';
import HomeLogo from '../../svgs/Home';
import { SidebarContext } from './SidebarContext';
import Modal from '../modal/Modal';
import AddChannelForm from './add-channel-form/AddChannelForm';
import useFetch from '../hooks/useFetch';
import Channel from './channel/Channel';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Logout from './Logout/Logout';
import useUtil from './useUtil';

interface ChannelType {
  _id: string;
  channel_name: string;
}

const Sidebar = () => {
  const { activeChannel, setActiveChannel } = useContext(SidebarContext);
  const [showModal, setShowModal] = useState(false);
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [channelName, setChannelName] = useState('');

  const user = useSelector((state: RootState) => state.user);

  const { addChannel } = useUtil({ channelName, user, setErrorMessage });

  const { data } = useFetch<'channel', { _id: string; channel_name: string }[]>(
    {
      route: 'channel',
      action: 'getChannels',
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
        <AddChannel onClick={() => setShowModal(true)}>+</AddChannel>
      </StyledChannel>
      <LogoutButton>
        <Logout />
      </LogoutButton>
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
            setChannelName('');
          }}
          onConfirm={() => {
            addChannel();
            setChannelName('');
          }}
          showModal={showModal}
        >
          <AddChannelForm
            user={user}
            channelName={channelName}
            errorMessage={errorMessage}
            setActiveChannel={(id: string) => setActiveChannel(id)}
            setChannelName={setChannelName}
          />
        </Modal>
      )}
    </Container>
  );
};

export default Sidebar;
