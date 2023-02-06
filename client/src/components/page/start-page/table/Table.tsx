import { useContext } from 'react';
import { ModalContext } from '../../../modal/ModalContext';
import Ellipsis from '../Ellipsis';
import { Table as StyledTable, Cell, Header, Row, Title } from './Styles';

interface User {
  _id: string;
  username: string;
}
interface Channel {
  _id: string;
  channel_name: string;
  users: User[];
  owner: User;
}

const Table = (props: {
  channels: Channel[];
  actions: { label: React.ReactNode; action: (channel: Channel) => void }[];
}) => {
  const { setInviteChannelId } = useContext(ModalContext);

  return (
    <StyledTable>
      <thead>
        <tr>
          <Title colSpan={4}>Channels</Title>
        </tr>
        <tr>
          <Header>Channel name</Header>
          <Header>Users</Header>
          <Header>Owner</Header>
          <Header></Header>
        </tr>
      </thead>
      <tbody>
        {props.channels.map((channel, idx) => (
          <Row key={idx} index={idx}>
            <Cell>{channel.channel_name}</Cell>
            <Cell
              style={{ cursor: 'pointer' }}
              onClick={() => setInviteChannelId(channel._id)}
            >
              {channel.users.map((user) => user.username)}
            </Cell>
            <Cell>{channel.owner.username}</Cell>
            <Cell
              style={{
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ellipsis channel={channel} actions={props.actions} />
            </Cell>
          </Row>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
