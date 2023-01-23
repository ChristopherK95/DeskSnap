import { useState } from 'react';
import { Container } from './Styles';
import Input from '../../input/Input';
// import { Input } from './Styles';

const LoginPage = (props: {
  setUser: (user: { id: string; name: string }) => void;
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      <button
        onClick={() => props.setUser({ id: '132fedsfsd', name: 'Torres' })}
      >
        Login
      </button>
    </Container>
  );
};

export default LoginPage;
