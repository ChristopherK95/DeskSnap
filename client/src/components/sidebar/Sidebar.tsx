import { useContext, useEffect, useState } from 'react';
import Tooltip from '../tooltip/Tooltip';
import { AddChannel, Channel, Circle, Container, Home } from './Styles';
import HomeLogo from '../../svgs/Home';
import { SidebarContext } from './SidebarContext';
import Modal from '../modal/Modal';
import AddChannelForm from './add-channel-form/AddChannelForm';
import useFetch from '../hooks/useFetch';

interface Channel {
  channel_id: string;
  channel_name: string;
}

const Sidebar = (props: { user: { id: string; name: string } }) => {
  const { user } = props;
  const { activeChannel, setActiveChannel } = useContext(SidebarContext);
  const [showModal, setShowModal] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([]);

  const { data } = useFetch<
    'user',
    { channel_id: string; channel_name: string }[]
  >({
    route: 'user',
    action: 'getChannels',
    key: 'sidebar-channels',
    options: { refetchOnWindowFocus: false },
    payload: { user_id: user?.id },
  });

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
            selected={activeChannel === c.channel_id}
            onClick={() => setActiveChannel(c.channel_id)}
          >
            {c.channel_name[0]}
            <Tooltip direction="right" value={c.channel_name} />
          </Circle>
        </Channel>
      ))}
      <Channel>
        <AddChannel onClick={() => setShowModal(true)}>+</AddChannel>
      </Channel>
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
