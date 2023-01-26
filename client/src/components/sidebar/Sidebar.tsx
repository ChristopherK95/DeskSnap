import { useContext, useState } from 'react';
import Tooltip from '../tooltip/Tooltip';
import { AddChannel, Channel, Circle, Container, Home } from './Styles';
import HomeLogo from '../../svgs/Home';
import { SidebarContext } from './SidebarContext';
import Modal from '../modal/Modal';

const Sidebar = (props: { channels: { id: string; name: string }[] }) => {
  const { channels } = props;
  const { activeChannel, setActiveChannel } = useContext(SidebarContext);
  const [showModal, setShowModal] = useState(false);

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
      {channels.map((c) => (
        <Channel key={c.id}>
          <Circle
            selected={activeChannel === c.id}
            onClick={() => setActiveChannel(c.id)}
          >
            {c.name[0]}
            <Tooltip direction="right" value={c.name} />
          </Circle>
        </Channel>
      ))}
      <Channel>
        <AddChannel onClick={() => setShowModal(true)}>+</AddChannel>
      </Channel>
      {showModal && (
        <Modal size={{ height: 500, width: 400 }}>
          <div>testing</div>
        </Modal>
      )}
    </Container>
  );
};

export default Sidebar;
