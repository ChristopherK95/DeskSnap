import Input from '../../../input/Input';
import { Container, Title } from './Styles';

const CreateChannelForm = (props: {
  user: { id: string; username: string };
  channelName: string;
  setChannelName: (val: string) => void;
  setActiveChannel: (channel: {id: string, channelName: string}) => void;
  onKeyEnter: () => void;
}) => {
  return (
    <Container>
      <Title>Create Channel</Title>
      <Input
        label="Channel Name"
        value={props.channelName}
        type="text"
        onChange={props.setChannelName}
        onKeyEnter={props.onKeyEnter}
      />
    </Container>
  );
};

export default CreateChannelForm;
