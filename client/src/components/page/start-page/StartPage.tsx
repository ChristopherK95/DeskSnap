import { useEffect, useState } from 'react';
import useFetch, { fetchOnce } from '../../hooks/useFetch';
import { Container } from './Styles';
import { useQueryClient } from 'react-query';
import Table from './table/Table';
import Edit from './Edit';
import List from '../../list/List';

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

  const arr = [
    { channelName: 'games', owner: 'Torres' },
    { channelName: 'sports', owner: 'Basse' },
  ];

  return (
    <Container>
      <List title="Invites" items={arr} button={<><div onClick={() => console.log('no')}>No</div><div onClick={() => console.log('yes')}>Yes</div></>} />
      <Table
        channels={channels}
        actions={[
          {
            label: <Edit />,
            action: () => console.log('Edit'),
          },
          {
            label: 'Delete',
            action: async (channel) => {
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
    </Container>
  );
};

export default StartPage;
