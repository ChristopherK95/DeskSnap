import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import Ellipsis from '../Ellipsis';
import { Channel } from '../types';
import {
  Table as StyledTable,
  Cell,
  Header,
  Row,
  Title,
  UsersCell,
} from './Styles';

const Table = (props: {
  channels: Channel[];
  actions: { label: React.ReactNode; action: (channel: Channel) => void }[];
  setShowUsers: (channel: number | undefined) => void;
}) => {
  const user = useSelector((state: RootState) => state.user);

  const setActions = (channel: Channel) => {
    const arr = props.actions.map((obj) =>
      channel.owner.username !== user.username && obj.label === 'Delete'
        ? { ...obj, label: 'Leave' }
        : obj,
    );
    return arr;
  };

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
              style={{ cursor: 'pointer', maxWidth: '150px' }}
              onClick={() =>
                props.setShowUsers(props.channels.indexOf(channel))
              }
            >
              <UsersCell>
                {channel.users.map((user) => `${user.username} `)}
              </UsersCell>
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
              <Ellipsis channel={channel} actions={setActions(channel)} />
            </Cell>
          </Row>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
