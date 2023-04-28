import styled from 'styled-components';
import useColor from '../../hooks/use-color';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useEffect } from 'react';
import SuccessIcon from '../../../svgs/SuccessIcon';
import ErrorIcon from '../../../svgs/Cross';
import { useDispatch } from 'react-redux';
import { removeNotif } from '../../../slice/notifSlice';

const Container = styled.div<{ error?: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  position: fixed;
  bottom: 50px;
  border-radius: 5px;
  font-size: 22px;
  font-family: RobotoBold;
  color: ${useColor('white')};
  box-shadow: 0px 0px 3px 5px rgba(0, 0, 0, 0.3);
  animation-name: enter;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;

  @keyframes enter {
    from {
      opacity: 0;
      transform: translateY(100px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  svg {
    width: 50px;
    ${(p) => p.error && `fill: ${useColor('error')}`}
  }
`;

const Notification = (props: { body: React.ReactNode; error?: boolean }) => {
  return (
    <Container error={props.error}>
      {props.error ? <ErrorIcon /> : <SuccessIcon />}
      {props.body}
    </Container>
  );
};

const ProviderContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const NotificationProvider = (props: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { message, showNotif, time, error } = useSelector(
    (state: RootState) => state.notif,
  );

  useEffect(() => {
    if (showNotif) {
      setTimeout(() => {
        dispatch(removeNotif());
      }, time * 1000);
    }
  }, [showNotif]);

  return (
    <ProviderContainer>
      {props.children}
      {showNotif && <Notification body={message} error={error} />}
    </ProviderContainer>
  );
};

export default NotificationProvider;
