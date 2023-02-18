import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../reusable/components/Button/Button';
import { RootState } from '../../../store';
import Popup from '../../popup/Popup';
import {
  Password,
  Container,
  Label,
  Category,
  Value,
  Window,
  HR,
  ButtonContainer,
  Span,
  Delete,
  DeleteContainer,
  DeleteTitle,
  DeleteText,
} from './Styles';
import useFunctions from './useFunctions';
import usePopup from './user-popup/usePopup';

const UserInfo = () => {
  const user = useSelector((state: RootState) => state.user);
  const [showPopup, setShowPopup] = useState<'Username' | 'Password'>();
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState(user.username);

  const { changeUsername, changePassword, deleteAccount } = useFunctions();

  const popup = usePopup({
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  });

  return (
    <Window>
      <Container>
        <Category>
          <Label>
            <Span>Username</Span>
          </Label>
          <Value>
            <Span>{user.username}</Span>
          </Value>
          <ButtonContainer>
            <Button onClick={() => setShowPopup('Username')} size="normal">
              Change
            </Button>
          </ButtonContainer>
        </Category>
        <HR />
        <Category>
          <Label>Password</Label>
          <Value>
            <Span>
              <p style={{ margin: '0' }}>•••••••••••••</p>
            </Span>
            <Password>
              <p style={{ margin: '10px 0 0 0' }}>Last set 4/2/2023</p>
            </Password>
          </Value>
          <ButtonContainer>
            <Button onClick={() => setShowPopup('Password')} size="normal">
              Change
            </Button>
          </ButtonContainer>
        </Category>
      </Container>
      <Delete>
        <Button
          onClick={() => setShowDeleteAccount(true)}
          danger={true}
          size="small"
        >
          Delete account
        </Button>
      </Delete>
      {showPopup && (
        <Popup
          onClose={() => setShowPopup(undefined)}
          onConfirm={() => {
            showPopup === 'Username' && changeUsername(user.id, username);
            showPopup === 'Password' &&
              changePassword(user.id, password, confirmPassword);
            setShowPopup(undefined);
          }}
          showPopup={Boolean(showPopup)}
          size={{ height: 'auto;', width: 350 }}
        >
          {popup(showPopup)}
        </Popup>
      )}
      {showDeleteAccount && (
        <Popup
          onClose={() => setShowDeleteAccount(false)}
          onConfirm={() => deleteAccount(user.id)}
          showPopup={showDeleteAccount}
          buttonText="Delete"
          danger={true}
        >
          <DeleteContainer>
            <DeleteTitle>
              <h2>Delete Account</h2>
            </DeleteTitle>
            <DeleteText>
              Are you sure you want to delete your account?
            </DeleteText>
          </DeleteContainer>
        </Popup>
      )}
    </Window>
  );
};

export default UserInfo;
