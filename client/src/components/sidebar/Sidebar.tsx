import { useContext, useEffect, useState } from 'react';
import Tooltip from '../tooltip/Tooltip';
import {
  AddChannel,
  Channel,
  Circle,
  Container,
  Home,
  LogoutButton,
} from './Styles';
import HomeLogo from '../../svgs/Home';
import { SidebarContext } from './SidebarContext';
import Modal from '../modal/Modal';
import AddChannelForm from './add-channel-form/AddChannelForm';
import useFetch from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Logout from './Logout/Logout';

interface Channel {
  _id: string;
  channel_name: string;
}

const Sidebar = () => {
  const { activeChannel, setActiveChannel } = useContext(SidebarContext);
  const [showModal, setShowModal] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([]);

  const user = useSelector((state: RootState) => state.user);

  if (!user.id) {
    return <></>;
  }

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

  return (
    <Container>
      <Channel>
        <Home
          selected={activeChannel === 'home'}
          onClick={() => setActiveChannel('home')}
        >
          <HomeLogo />
        </Home>
      </Channel>
      {channels.map((c, i) => (
        <Channel key={i}>
          <Circle
            selected={activeChannel === c._id}
            onClick={() => setActiveChannel(c._id)}
          >
            {c.channel_name[0]}
            <Tooltip direction="right" value={c.channel_name} />
          </Circle>
        </Channel>
      ))}
      <Channel>
        <AddChannel onClick={() => setShowModal(true)}>+</AddChannel>
      </Channel>
      <LogoutButton>
        <Logout />
      </LogoutButton>
      {showModal && (
        <Modal>
          <AddChannelForm
            user={user}
            setActiveChannel={(id: string) => setActiveChannel(id)}
            setShowModal={(b: boolean) => setShowModal(b)}
          />
        </Modal>
      )}
    </Container>
  );
};

export default Sidebar;
