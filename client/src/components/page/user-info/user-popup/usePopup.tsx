import { match } from 'ts-pattern';
import UserPopup from './UserPopup';

const usePopup = (params: {
  username: string;
  setUsername: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
}) => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  } = params;

  const getPopup = (val: 'Username' | 'Email' | 'Password') => {
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
      .with('Email', () => (
        <UserPopup
          popup={{
            title: 'Change email',
            label: 'Enter email',
            value: email,
            onChange: setEmail,
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
