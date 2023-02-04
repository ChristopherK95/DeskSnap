import { useContext, useState } from 'react';
import Tooltip from '../../tooltip/Tooltip';
import { Channel as StyledChannel, Circle } from './Styles';
import { SidebarContext } from '../SidebarContext';

interface Channel {
  _id: string;
  channel_name: string;
}

const Channel = (props: { channel: Channel; idx: number }) => {
  const { channel, idx } = props;
  const { activeChannel, setActiveChannel } = useContext(SidebarContext);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <StyledChannel key={idx} selected={activeChannel === channel._id}>
      <Circle
        selected={activeChannel === channel._id}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setActiveChannel(channel._id)}
      >
        {channel.channel_name[0]}
        <Tooltip
          direction="right"
          visible={showTooltip}
          value={channel.channel_name}
        />
      </Circle>
    </StyledChannel>
  );
};

export default Channel;
