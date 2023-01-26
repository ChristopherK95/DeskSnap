import { useContext } from 'react';
import Tooltip from '../tooltip/Tooltip';
import { Channel, Circle, Container, Home } from './Styles';
import HomeLogo from '../../svgs/Home';
import { SidebarContext } from './SidebarContext';

const Sidebar = (props: { channels: { id: string; name: string }[] }) => {
  const { channels } = props;
  const { activeChannel, setActiveChannel } = useContext(SidebarContext);

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
    </Container>
  );
};

export default Sidebar;
