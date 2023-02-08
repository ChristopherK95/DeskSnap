import { FormEvent, useState } from 'react';
import { ButtonContainer, Form, Link } from './Styles';
import { redirect, useNavigate } from 'react-router-dom';
import Input from '../../input/Input';
import { fetchOnce } from '../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../slice/userSlice';
import { RootState } from '../../../store';
// import { Input } from './Styles';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, setSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  if (user.isLoggedIn) {
    navigate('/home');
  }

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await fetchOnce<
      'user',
      {
        user_id: string;
        username: string;
        message: string;
        login: boolean;
      }
    >({
      action: 'user/login',
      payload: { username, password },
      withCredentials: true,
    });

    if (result.data.login) {
      dispatch(
        setUser({
          id: result.data.user_id,
          username: result.data.username,
          isLoggedIn: true,
        }),
      );
      return redirect('/home');
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
      action: 'user/createUser',
      payload: { username, password },
      withCredentials: true,
    });
    if (
      user.data.message != undefined &&
      user.data.message.indexOf('Duplicate') >= 0
    ) {
      setLoginError('A user with that name already exist');
      return;
    }
    if (user.data.username != undefined) {
      dispatch(
        setUser({
          id: user.data.id,
          username: user.data.username,
          isLoggedIn: true,
        }),
      );
      navigate('/home');
    } else {
      return setLoginError(user.data.message);
    }
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
