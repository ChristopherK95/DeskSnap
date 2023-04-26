import { useState } from 'react';
import Popup from '../../popup/Popup';
import Tooltip from '../../tooltip/Tooltip';
import useUtil from '../useUtil';
import CreateChannelForm from './create-channel-form/CreateChannelForm';
import { Container } from './Styles';

interface Channel {
    id: string;
    channelName: string;
  }

const CreateChannel = (props: {
  user: {
    id: string;
    username: string;
    isLoggedIn: boolean;
  };
  setActiveChannel: (channel: Channel) => void;
}) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [channelName, setChannelName] = useState('');

  const { user, setActiveChannel } = props;

  const { addChannel } = useUtil({ channelName, user });

  return (
    <>
      <Container
        onClick={() => setShowPopup(true)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        +
        <Tooltip
          direction={'right'}
          value={'Create channel'}
          visible={showTooltip}
        />
      </Container>
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
            setActiveChannel={(channel: {id: string, channelName: string}) => setActiveChannel(channel)}
            setChannelName={setChannelName}
            onKeyEnter={() => {
              addChannel();
              setChannelName('');
              setShowPopup(false);
            }}
          />
        </Popup>
      )}
    </>
  );
};

export default CreateChannel;
