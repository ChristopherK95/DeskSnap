import Input from '../../input/Input';
import { Container, Title } from './Styles';

const AddChannelForm = (props: {
  user: { id: string; username: string };
  channelName: string;
  errorMessage: string;
  setChannelName: (val: string) => void;
  setActiveChannel: (id: string) => void;
}) => {
  return (
    <Container>
      <Title>Add Channel</Title>
      <Input
        label="Channel Name"
        value={props.channelName}
        type="text"
        onChange={props.setChannelName}
      />
      {props.errorMessage != '' && <div>{props.errorMessage}</div>}
    </Container>
  );
};

export default AddChannelForm;
