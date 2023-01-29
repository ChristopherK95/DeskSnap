import { useEffect, useState } from 'react';
import useFetch, { fetchOnce } from '../../hooks/useFetch';
import { Cell, Container, Header, Row, Table, Title } from './Styles';
import Ellipsis from './Ellipsis';
import Edit from './Edit';
import { useQueryClient } from 'react-query';

interface User {
  _id: string;
  username: string;
}
interface Channels {
  _id: string;
  channel_name: string;
  users: User[];
  owner: User;
}

const StartPage = (props: { userId: string }) => {
  const { data, isLoading } = useFetch<'channel', Channels[]>({
    route: 'channel',
    action: 'getChannelsOverview',
    payload: { user_id: props.userId },
    key: 'channels-overview',
    options: { refetchOnWindowFocus: false },
  });
  const [channels, setChannels] = useState<Channels[]>();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      setChannels(data);
    }
  }, [data]);

  if (isLoading) {
    return <Container>Loading..</Container>;
  }

  if (!channels || channels?.length === 0) {
    return <>No channels</>;
  }

  return (
    <Container>
      <Table>
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
          {channels.map((channel, idx) => (
            <Row key={idx} index={idx}>
              <Cell>{channel.channel_name}</Cell>
              <Cell>{channel.users.map((user) => user.username)}</Cell>
              <Cell>{channel.owner.username}</Cell>
              <Cell
                style={{
                  padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ellipsis
                  actions={[
                    {
                      label: <Edit />,
                      action: () => console.log('Edit'),
                    },
                    {
                      label: 'Delete',
                      action: async () => {
                        await fetchOnce<'channel'>({
                          route: 'channel',
                          action: 'removeChannel',
                          payload: { channel_id: channel._id },
                        });
                        queryClient.invalidateQueries('channels-overview');
                        queryClient.invalidateQueries('sidebar-channels');
                      },
                    },
                  ]}
                />
              </Cell>
            </Row>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default StartPage;
