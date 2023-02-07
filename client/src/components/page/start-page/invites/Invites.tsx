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
import useFetch from '../../../hooks/useFetch';
import Deny from '../../../../svgs/Deny';
import Accept from '../../../../svgs/Accept';
import useColor from '../../../../reusable/hooks/useColor';

interface Invites {
  channelName: string;
  senderName: string;
}

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

const InvitesList = (props: { invites: Invites[] }) => {
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
          <Cell>{invite.channelName}</Cell>
          <Cell>{invite.senderName}</Cell>
          <Buttons style={{ display: 'flex' }}>
            <Deny />
            <Accept />
          </Buttons>
        </Row>
      ))}
    </List>
  );
};

const Invites = () => {
  // const {data} = useFetch<'user', {channelName: string; senderName: string}[]>({key: 'get-invites'})
  const [invites, setInvites] = useState<Invites[]>([
    { channelName: 'Sports', senderName: 'Victor' },
    { channelName: 'Ultimate Giga Chads', senderName: 'Billy' },
    { channelName: 'Ultimate Giga Chads', senderName: 'Billy' },
    { channelName: 'Ultimate Giga Chads', senderName: 'Billy' },
    { channelName: 'Ultimate Giga Chads', senderName: 'Billy' },
    { channelName: 'Ultimate Giga Chads', senderName: 'Billy' },
    { channelName: 'Ultimate Giga Chads', senderName: 'Billy' },
    { channelName: 'Ultimate Giga Chads', senderName: 'Billy' },
    { channelName: 'Ultimate Giga Chads', senderName: 'Billy' },
    { channelName: 'Ultimate Giga Chads', senderName: 'Billy' },
  ]);
  const [read, setRead] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    if (invites.length > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [invites]);

  // useEffect(() => {
  //   if(data) {
  //     setInvites(data)
  //   }
  // }, [data])

  return (
    <Container
      onClick={() => {
        setVisible(false);
        setRead(true);
      }}
      visible={true}
    >
      <InvitesList invites={invites} />
      <InvitesButton>
        <Icon read={read} />
      </InvitesButton>
    </Container>
  );
};

export default Invites;
