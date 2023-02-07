import styled from 'styled-components';
import useColor from '../../hooks/useColor';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useEffect, useState } from 'react';

const Container = styled.div<{ danger?: boolean }>`
  display: flex;
  padding: 20px;
  position: fixed;
  top: 50px;
  right: 30px;
  border-radius: 5px;
  font-size: 30px;
  font-family: RobotoBold;
  background-color: ${(p) =>
    p.danger ? useColor('red') : useColor('darkGray')};
  color: ${(p) => (p.danger ? useColor('darkGray') : useColor('white'))};
  box-shadow: 0px 0px 3px 5px rgba(0, 0, 0, 0.3);
`;

const Notification = (props: { body: React.ReactNode; danger?: boolean }) => {
  return <Container danger={props.danger}>{props.body}</Container>;
};

const ProviderContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const NotificationProvider = (props: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { message, showNotif, time, danger } = useSelector(
    (state: RootState) => state.notif,
  );

  useEffect(() => {
    setVisible(showNotif);

    if (showNotif) {
      setTimeout(() => {
        setVisible(false);
      }, time * 1000);
    }
  }, [showNotif]);

  return (
    <ProviderContainer>
      {props.children}
      {visible && <Notification body={message} danger={danger} />}
    </ProviderContainer>
  );
};

export default NotificationProvider;
