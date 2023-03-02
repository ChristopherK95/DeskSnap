import { useEffect, useState } from 'react';
import InviteRead from '../../../../svgs/InviteRead';
import InviteUnread from '../../../../svgs/InviteUnread';
import {
  Buttons,
  Cell,
  Container,
  InvitesButton,
  List,
  Row,
  StyledIcon,
} from './Styles';
import { fetchOnce } from '../../../hooks/useFetch';
import Deny from '../../../../svgs/Deny';
import Accept from '../../../../svgs/Accept';
import useColor from '../../../../reusable/hooks/useColor';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useQueryClient } from 'react-query';
import { Invite } from '../types';

const Icon = (props: { read: boolean }) => {
  if (props.read) {
    return (
      <StyledIcon>
        <InviteRead />
      </StyledIcon>
    );
  }

  return (
    <StyledIcon>
      <InviteUnread />
    </StyledIcon>
  );
};

const InvitesList = (props: { invites: Invite[] }) => {
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.user);

  const acceptInvite = async (channel_id: string) => {
    const response = await fetchOnce<'channel', { message: string }>({
      action: 'channel/acceptInvite',
      payload: { user_id: user.id, channel_id },
    });
    if (response.status === 200) {
      queryClient.invalidateQueries('channels-overview');
      queryClient.invalidateQueries('get-invites');
    }
  };

  const declineInvite = async (channel_id: string) => {
    const response = await fetchOnce<'user', { message: string }>({
      action: 'user/declineInvite',
      payload: { user_id: user.id, channel_id },
    });
    if (response.status === 200) {
      queryClient.invalidateQueries('get-invites');
    }
  };

  if (props.invites.length === 0) {
    return (
      <List>
        <div
          style={{
            height: '200px',
            width: '500px',
            backgroundColor: useColor('darkGray'),
            fontFamily: 'RobotoMedium',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          No more invites
        </div>
      </List>
    );
  }

  return (
    <List>
      {props.invites.map((invite, idx) => (
        <Row key={idx} index={idx}>
          <Cell>{invite.channel.channel_name}</Cell>
          <Cell>{invite.sender}</Cell>
          <Buttons style={{ display: 'flex' }}>
            <Deny onClick={() => declineInvite(invite.channel._id)} />
            <Accept onClick={() => acceptInvite(invite.channel._id)} />
          </Buttons>
        </Row>
      ))}
    </List>
  );
};

const Invites = (props: { invites: Invite[] }) => {
  const { invites } = props;
  const user = useSelector((state: RootState) => state.user);
  const [read, setRead] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(false);

  const setInvitesSeen = () => {
    const res = fetchOnce<'user', { message: string }>({
      action: 'user/invitesSeen',
      payload: { user_id: user.id },
    });
    return res;
  };

  useEffect(() => {
    if (invites.length > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    let seen = true;
    for (const invite of invites) {
      if (!invite.seen) {
        seen = false;
        break;
      }
    }
    setRead(seen);
  }, [invites]);

  return (
    <Container
      onClick={() => {
        setRead(true);
        setInvitesSeen();
        setShowList(!showList);
      }}
      visible={visible}
    >
      {showList && <InvitesList invites={invites} />}
      <InvitesButton>
        <Icon read={read} />
      </InvitesButton>
    </Container>
  );
};

export default Invites;
