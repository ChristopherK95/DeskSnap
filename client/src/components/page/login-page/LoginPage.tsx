import { FormEvent, useState } from 'react';
import { ButtonContainer, Form, Link } from './Styles';
import Input from '../../input/Input';
import { fetchOnce } from '../../hooks/useFetch';
// import { Input } from './Styles';

const LoginPage = (props: {
  setUser: (user: { id: string; name: string }) => void;
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, setSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await fetchOnce<
      'user',
      {
        id: string;
        message: string;
        login: boolean;
      }
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

  const signUser = async (e: FormEvent) => {
    e.preventDefault();
    if (username.length < 3 || username.length > 20)
      return setLoginError(
        'The username needs to be at least 4 characters and at most 20',
      );
    if (password.length < 4)
      return setLoginError('Password does not fulfill requirements');
    if (password != confirmPassword)
      return setLoginError('The passwords do not match');

    const user = await fetchOnce<
      'user',
      {
        id: string;
        username: string;
        message: string;
      }
    >({
      route: 'user',
      action: 'createUser',
      payload: { username, password },
    });
    if (
      user.data.message != undefined &&
      user.data.message.indexOf('Duplicate') >= 0
    ) {
      setLoginError('A user with that name already exist');
      return;
    }
    if (user.data.username != undefined) {
      props.setUser({ id: user.data.id, name: user.data.username });
      return;
    }
    return setLoginError(user.data.message);
  };

  const nameOnChange = (v: string) => {
    setLoginError('');
    setUsername(v);
  };

  const passOnChange = (v: string) => {
    setLoginError('');
    setPassword(v);
  };

  return (
    <Form onSubmit={signUp ? signUser : login}>
      <Input
        label="Username"
        value={username}
        onChange={(v) => nameOnChange(v)}
        type="text"
        // placeholder="Username"
        // value={username}
        // onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="Password"
        value={password}
        onChange={(v) => passOnChange(v)}
        type="password"
        // placeholder="Password"
        // value={password}
        // onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        style={{
          height: `${signUp ? '50px' : '0'}`,
          opacity: `${signUp ? '1' : '0'}`,
          marginBottom: `${signUp ? '0' : '-20px'}`,
          transition: `height 0.4s, ${
            signUp ? 'opacity 0.6s' : 'opacity 0.2s'
          }, margin-bottom 0.4s`,
        }}
        label="Repeat Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        type="password"
      />
      <ButtonContainer>
        <button type="submit">{signUp ? 'Submit' : 'Login'}</button>
        {signUp ? (
          <div>
            Already a member?{' '}
            <Link onClick={() => setSignUp(false)}>Login</Link>
          </div>
        ) : (
          <div>
            Not a member? <Link onClick={() => setSignUp(true)}>Signup</Link>
          </div>
        )}
      </ButtonContainer>
      <label>{loginError}</label>
    </Form>
  );
};

export default LoginPage;