import {
  Container,
  LogoutButton,
  LogoutContainer,
  Text,
  Title,
} from './Styles';
import LogoutLogo from '../../../svgs/Logout';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slice/userSlice';
import { fetchOnce } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Popup from '../../popup/Popup';
import { useState } from 'react';
import Tooltip from '../../tooltip/Tooltip';

const Logout = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await fetchOnce<'user'>({
      action: 'user/logout',
      payload: {},
      withCredentials: true,
    });
    dispatch(setUser({ id: '', username: '', isLoggedIn: false }));
    navigate('/login');
  };

  return (
    <>
      <LogoutButton
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Container onClick={() => setShowPopup(true)}>
          <LogoutLogo />
        </Container>
        <Tooltip direction={'right'} value={'Logout'} visible={showTooltip} />
      </LogoutButton>
      {showPopup && (
        <Popup
          onClose={() => setShowPopup(false)}
          onConfirm={logout}
          showPopup={showPopup}
          danger={true}
          buttonText="Logout"
        >
          <LogoutContainer>
            <Title>
              <h2>Logging out</h2>
            </Title>
            <Text>
              <div>Are you sure you want to log out?</div>
            </Text>
          </LogoutContainer>
        </Popup>
      )}
    </>
  );
};

export default Logout;
