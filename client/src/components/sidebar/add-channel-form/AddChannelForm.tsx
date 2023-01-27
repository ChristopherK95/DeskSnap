import { FormEvent, useState } from 'react';
import { fetchOnce } from '../../hooks/useFetch';
import Input from '../../input/Input';
import { Button, Form, Title } from './Styles';

const AddChannelForm = (props: {
  user: { id: string; name: string };
  setActiveChannel: (id: string) => void;
  setShowModal: (b: boolean) => void;
}) => {
  const { user, setActiveChannel, setShowModal } = props;
  const [channelName, setChannelName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addChannel = async (e: FormEvent) => {
    e.preventDefault();
    if (channelName.length > 15) return;
    if (channelName.length < 3) return;
    const channel = await fetchOnce<
      'channel',
      { response: { _id: string; channel_name: string }; message: string }
    >({
      route: 'channel',
      action: 'createChannel',
      payload: { channel_name: channelName, user_id: user.id },
    });
    if (channel.status === 204 || channel.status === 200) {
      setActiveChannel(channel.data.response._id);
      setShowModal(false);
    }
    if (channel.status === 500) {
      setErrorMessage(channel.data.message);
    }
  };

  return (
    <Form onSubmit={addChannel}>
      <Title>Add Channel</Title>
      <Input
        label="Channel Name"
        value={channelName}
        type="text"
        onChange={setChannelName}
      />
      <Button>Submit</Button>
      {errorMessage != '' && <div>{errorMessage}</div>}
    </Form>
  );
};

export default AddChannelForm;
