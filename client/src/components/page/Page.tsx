import { useState } from 'react';
import { Channel, Circle, Content, Sidebar, Tooltip } from './Styles';
import { useQuery } from 'react-query';
import axios from 'axios';
import VideoPlayer from '../video-player/VideoPlayer';

const HomePage = () => {
  // const a = useQuery('getChannels', () => axios.post('getChannels', {userId: }))
  const [channels, setChannels] = useState<{ id: number; name: string }[]>([
    { id: 0, name: 'Basse' },
    { id: 1, name: 'Victor' },
    { id: 2, name: 'Christopher' },
  ]);

  const [selected, setSelected] = useState<number>();

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <Sidebar>
        {channels.map((c) => (
          <Channel key={c.id}>
            <Circle
              selected={selected === c.id}
              onClick={() => setSelected(c.id)}
            >
              {c.name[0]}
              <Tooltip>{c.name}</Tooltip>
            </Circle>
          </Channel>
        ))}
      </Sidebar>
      <Content>
        <VideoPlayer />
      </Content>
    </div>
  );
};

export default HomePage;
