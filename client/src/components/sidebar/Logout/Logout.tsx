import { Container, LogoutModal, Text, Title } from './Styles';
import LogoutLogo from '../../../svgs/Logout';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slice/userSlice';
import { fetchOnce } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Modal from '../../modal/Modal';
import { useState } from 'react';

const Logout = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
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
    <>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onConfirm={logout}
          showModal={showModal}
          danger={true}
          buttonText="Logout"
        >
          <LogoutModal>
            <Title>
              <h2>Logging out</h2>
            </Title>
            <Text>
              <div>Are you sure you want to log out?</div>
            </Text>
          </LogoutModal>
        </Modal>
      )}
      <Container onClick={() => setShowModal(true)}>
        <LogoutLogo />
      </Container>
    </>
  );
};

export default Logout;
