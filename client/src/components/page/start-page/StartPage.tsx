import { useEffect, useState } from 'react';
import useFetch, { fetchOnce } from '../../hooks/useFetch';
import { Container } from './Styles';
import { useQueryClient } from 'react-query';
import Table from './table/Table';
import Edit from './Edit';
import Modal from '../../modal/Modal';
import InviteForm from './invite-form/InviteForm';

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
    action: 'channel/getChannelsOverview',
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
                action: 'channel/removeChannel',
                payload: { user_id: props.userId, channel_id: channel._id },
              });
              queryClient.invalidateQueries('channels-overview');
              queryClient.invalidateQueries('sidebar-channels');
            },
          },
        ]}
      />
      <InviteForm />
    </Container>
  );
};

export default StartPage;
