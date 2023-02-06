import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../../reusable/component/Button/Button';
import { RootState } from '../../../../store';
import { fetchOnce } from '../../../hooks/useFetch';
import Input from '../../../input/Input';
import Modal from '../../../modal/Modal';
import { ModalContext } from '../../../modal/ModalContext';
import RemoveIcon from './RemoveIcon';
import { Form, InputContainer, RemoveInput, Title } from './Styles';

const InviteForm = () => {
  const { inviteChannelId, setInviteChannelId } = useContext(ModalContext);
  const user = useSelector((state: RootState) => state.user);
  const [usernames, setUsernames] = useState<string[]>(['']);

  const invite = async () => {
    const arr = usernames.filter((item) => item !== '');
    const res = await fetchOnce<'user'>({
      route: 'user',
      action: 'invite',
      payload: {
        usernames: arr,
        channel_id: inviteChannelId,
        sender: user.username,
      },
    });
    return res;
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

  return (
    <Modal
      onClose={() => setInviteChannelId(undefined)}
      onConfirm={() => {
        invite();
        setUsernames(['']);
      }}
      showModal={Boolean(inviteChannelId)}
      size={{ width: 400, height: 'auto' }}
    >
      <Form>
        <Title>Add User</Title>
        {usernames.map((input, i) => {
          return (
            <InputContainer key={i}>
              <Input
                label="username"
                value={input}
                onChange={(value) => updateInputs(i, value)}
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
        <Button size="small" onClick={() => setUsernames([...usernames, ''])}>
          Add another
        </Button>
      </Form>
    </Modal>
  );
};

export default InviteForm;
