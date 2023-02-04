import { useContext, useEffect, useState } from 'react';
import { AddChannel, StyledChannel, Container, Home } from './Styles';
import HomeLogo from '../../svgs/Home';
import { SidebarContext } from './SidebarContext';
import Modal from '../modal/Modal';
import AddChannelForm from './add-channel-form/AddChannelForm';
import useFetch from '../hooks/useFetch';
import Channel from './channel/Channel';

interface ChannelType {
  _id: string;
  channel_name: string;
}

const Sidebar = (props: { user: { id: string; name: string } }) => {
  const { user } = props;
  const { activeChannel, setActiveChannel } = useContext(SidebarContext);
  const [showModal, setShowModal] = useState(false);
  const [channels, setChannels] = useState<ChannelType[]>([]);

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
