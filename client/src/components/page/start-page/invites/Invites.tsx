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
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

interface Invites {
  channel: {
    channel_id: string;
    channel_name: string;
  };
  sender: string;
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
          <Cell>{invite.channel.channel_name}</Cell>
          <Cell>{invite.sender}</Cell>
          <Buttons style={{ display: 'flex' }}>
            <Deny />
            <Accept />
          </Buttons>
        </Row>
      ))}
    </List>
  );
};

const Invites = (props: { invites: Invites[] }) => {
  const { invites } = props;
  const [read, setRead] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    if (invites.length > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [invites]);

  return (
    <Container
      onClick={() => {
        setVisible(false);
        setRead(true);
      }}
      visible={visible}
    >
      <InvitesList invites={invites} />
      <InvitesButton>
        <Icon read={read} />
      </InvitesButton>
    </Container>
  );
};

export default Invites;
