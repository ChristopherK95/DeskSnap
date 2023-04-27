import { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../../reusable/components/Button/Button';
import { RootState } from '../../../../store';
import { fetchOnce } from '../../../hooks/useFetch';
import Input from '../../../input/Input';
import Popup from '../../../popup/Popup';
import { PopupContext } from '../../../popup/PopupContext';
import RemoveIcon from './RemoveIcon';
import { Form, InputContainer, RemoveInput, Title, Container } from './Styles';
import { socket } from '../../../../socket';
import useNotify from '../../../../reusable/hooks/use-notify';

const InviteForm = () => {
  const { inviteChannelId, setInviteChannelId } = useContext(PopupContext);
  const user = useSelector((state: RootState) => state.user);
  const [usernames, setUsernames] = useState<string[]>(['']);

  const notify = useNotify();
  const containerRef = useRef({} as HTMLDivElement);

  const invite = async () => {
    const arr = usernames.filter((item) => item !== '');
    if (arr.length === 0) return;
    const res = await fetchOnce<'user', { amount: string; message: string }>({
      action: 'user/invite',
      payload: {
        usernames: arr,
        channel_id: inviteChannelId,
        sender: user.username,
      },
    });
    if (res.data.amount === 'none') {
      notify(res.data.message, undefined, true);
    } else {
      notify(res.data.message);
      socket.emit('send-invite', arr);
    }
  };

  const updateInputs = (index: number, value: string) => {
    const arr = [...usernames];
    arr[index] = value;
    setUsernames(arr);
  };

  const removeInput = (index: number) => {
    const arr = [...usernames];
    arr.splice(index, 1);
    setUsernames(arr);
  };

  const addInput = () => {
    setUsernames([...usernames, '']);
  };

  useEffect(() => {
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [usernames, containerRef.current]);

  if (!inviteChannelId) return null;

  return (
    <Popup
      onClose={() => {
        setInviteChannelId(undefined);
        setUsernames(['']);
      }}
      onConfirm={() => {
        invite();
        setUsernames(['']);
      }}
      showPopup={Boolean(inviteChannelId)}
      size={{ width: 400, height: 'auto' }}
    >
      <Form>
        <Title>Add User</Title>
        <Container ref={containerRef}>
          {usernames.map((input, i) => {
            return (
              <InputContainer key={i}>
                <Input
                  label="username"
                  value={input}
                  onChange={(value) => updateInputs(i, value)}
                  onKeyEnter={() => {
                    invite();
                    setUsernames(['']);
                    setInviteChannelId(undefined);
                  }}
                  type={'text'}
                  style={{ width: '100%' }}
                />
                {i > 0 && (
                  <RemoveInput id="rm" onClick={() => removeInput(i)}>
                    <RemoveIcon />
                  </RemoveInput>
                )}
              </InputContainer>
            );
          })}
        </Container>
        <Button size="small" onClick={addInput}>
          Add another
        </Button>
      </Form>
    </Popup>
  );
};

export default InviteForm;
