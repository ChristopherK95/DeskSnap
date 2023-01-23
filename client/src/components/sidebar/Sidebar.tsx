import { useState } from 'react';
import Tooltip from '../tooltip/Tooltip';
import { Channel, Circle, Container } from './Styles';

const Sidebar = (props: { channels: { id: number; name: string }[] }) => {
  const { channels } = props;
  const [selected, setSelected] = useState<number>();

  return (
    <Container>
      {channels.map((c) => (
        <Channel key={c.id}>
          <Circle
            selected={selected === c.id}
            onClick={() => setSelected(c.id)}
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
