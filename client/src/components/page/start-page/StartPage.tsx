import { useEffect, useState } from 'react';
import useFetch, { fetchOnce } from '../../hooks/useFetch';
import { Container } from './Styles';
import { useQueryClient } from 'react-query';
import Table from './table/Table';
import Edit from './Edit';
import { useDispatch } from 'react-redux';
import { setNotif } from '../../../slice/notifSlice';
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
  const dispatch = useDispatch();
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
              const { status } = await fetchOnce<'channel'>({
                action: 'channel/removeChannel',
                payload: { user_id: props.userId, channel_id: channel._id },
              });
              if (status === 200) {
                dispatch(
                  setNotif({ message: 'Removed channel successfully!' }),
                );
                queryClient.invalidateQueries('channels-overview');
                queryClient.invalidateQueries('sidebar-channels');
              } else {
                dispatch(
                  setNotif({
                    message: 'Failed to remove channel!',
                    error: true,
                  }),
                );
              }
            },
          },
        ]}
      />
      <InviteForm />
    </Container>
  );
};

export default StartPage;
