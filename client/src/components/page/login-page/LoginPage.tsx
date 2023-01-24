import { useState } from 'react';
import { ButtonContainer, Container } from './Styles';
import Input from '../../input/Input';
import useFetch from '../../hooks/useFetch';
// import { Input } from './Styles';

const LoginPage = (props: {
  setUser: (user: { id: string; name: string }) => void;
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, setSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const fetch = useFetch();

  const login = async () => {
    const result = await fetch<
      { id: string; message: string; login: boolean }
    >({
      route: 'user',
      action: 'login',
      payload: { username, password },
    });
    if (result.data.login) {
      return props.setUser({ id: result.data.id, name: username });
    }
    return setLoginError(result.data.message);
  };

  const signUser = async () => {
    // const user = (await axios.post('http://localhost:3000/users/createUser', {
    // }))
  };

  return (
    <Container>
      <Input
        label="Username"
        value={username}
        onChange={setUsername}
        // placeholder="Username"
        // value={username}
        // onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="Password"
        value={password}
        onChange={setPassword}
        // placeholder="Password"
        // value={password}
        // onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        style={{
          height: `${signUp ? '50px' : '0'}`,
          opacity: `${signUp ? '1' : '0'}`,
          marginBottom: `${signUp ? '0' : '-20px'}`,
          transition: 'height 0.4s, opacity 0.4s, margin-bottom 0.4s',
        }}
        label="Repeat Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />
      <ButtonContainer>
        <button onClick={signUp ? () => setSignUp(false) : login}>Login</button>
        <button onClick={signUp ? () => signUser() : () => setSignUp(true)}>
          Sign Up
        </button>
      </ButtonContainer>
      <label>{loginError}</label>
    </Container>
  );
};

export default LoginPage;
