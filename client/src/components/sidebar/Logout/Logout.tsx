import { Container } from './Styles';
import LogoutLogo from '../../../svgs/Logout';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slice/userSlice';
import { fetchOnce } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    await fetchOnce<'user'>({
      route: 'user',
      action: 'logout',
      payload: {},
      withCredentials: true,
    });
    dispatch(setUser({ id: '', username: '', isLoggedIn: false }));
    navigate('/login');
  };

  return (
    <Container onClick={logout}>
      <LogoutLogo />
    </Container>
  );
};

export default Logout;
