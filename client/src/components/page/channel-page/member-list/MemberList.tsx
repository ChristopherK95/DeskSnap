import { useContext, useEffect, useState } from 'react';
import useColor from '../../../../reusable/hooks/use-color';
import { socket } from '../../../../socket';
import { SidebarContext } from '../../../sidebar/SidebarContext';
import Tooltip from '../../../tooltip/Tooltip';
import { Channel } from '../../start-page/types';
import { Container, Status, StatusContainer, User } from './Styles';

const MemberList = (props: { channel: Channel }) => {
  const [users, setUsers] = useState<{ name: string; online: boolean }[]>([]);
  const [showOnlineUser, setShowOnlineUser] = useState(false);
  const [showOfflineUser, setShowOfflineUser] = useState(false);
  const { activeChannel } = useContext(SidebarContext);

  useEffect(() => {
    socket.emit('channel_users', activeChannel.id, (response: string[]) => {
      const tempUsers: { name: string; online: boolean }[] = [];
      props.channel.users.forEach((u) => {
        if (response.includes(u.username)) {
          tempUsers.push({ name: u.username, online: true });
        } else {
          tempUsers.push({ name: u.username, online: false });
        }
      });
      setUsers(tempUsers);
    });
  }, [activeChannel]);

  return (
    <Container>
      <StatusContainer>
        <Status style={{ color: useColor('acceptGreen') }}>Online</Status>
        {users.map(
          (user, i) =>
            user.online && (
              <User
                key={i}
                onMouseEnter={() => setShowOnlineUser(true)}
                onMouseLeave={() => setShowOnlineUser(false)}
              >
                <Tooltip
                  direction="left"
                  value={user.name}
                  visible={showOnlineUser}
                />
                {user.name}
              </User>
            ),
        )}
      </StatusContainer>
      <StatusContainer>
        <Status style={{ color: useColor('red') }}>Offline</Status>
        {users.map(
          (user, i) =>
            !user.online && (
              <User
                key={i}
                onMouseEnter={() => setShowOfflineUser(true)}
                onMouseLeave={() => setShowOfflineUser(false)}
              >
                <Tooltip
                  direction="left"
                  value={user.name}
                  visible={showOfflineUser}
                />
                {user.name}
              </User>
            ),
        )}
      </StatusContainer>
    </Container>
  );
};

export default MemberList;
