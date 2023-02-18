import { match } from 'ts-pattern';
import UserPopup from './UserPopup';

const usePopup = (params: {
  username: string;
  setUsername: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
}) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  } = params;

  const getPopup = (val: 'Username' | 'Password') => {
    return match(val)
      .with('Username', () => (
        <UserPopup
          popup={{
            title: 'Change username',
            label: 'Enter username',
            value: username,
            onChange: setUsername,
          }}
        />
      ))
      .with('Password', () => (
        <UserPopup
          popup={{
            title: 'Change password',
            label: 'Enter password',
            value: password,
            extraValue: confirmPassword,
            onChange: setPassword,
            extraOnChange: setConfirmPassword,
          }}
        />
      ))
      .otherwise(() => <></>);
  };

  return getPopup;
};

export default usePopup;
