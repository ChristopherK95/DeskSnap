import { useContext, useEffect, useState } from 'react';
import useFetch, { fetchOnce } from '../../hooks/useFetch';
import { Container } from './Styles';
import { useQueryClient } from 'react-query';
import Table from './table/Table';
import Edit from './Edit';
import { useDispatch } from 'react-redux';
import { setNotif } from '../../../slice/notifSlice';
import InviteForm from './invite-form/InviteForm';
import Invites, { Invite } from './invites/Invites';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { PopupContext } from '../../popup/PopupContext';

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
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { data, isLoading, isFetching } = useFetch<'channel', Channels[]>({
    action: 'channel/getChannelsOverview',
    payload: { user_id: props.userId },
    key: 'channels-overview',
    options: { refetchOnWindowFocus: false },
  });

  const invitesData = useFetch<'user', Invite[]>({
    action: 'user/getInvites',
    payload: { user_id: user.id },
    key: 'get-invites',
    options: { refetchOnWindowFocus: false },
  }).data;

  const [invites, setInvites] = useState<Invite[]>([]);
  const [channels, setChannels] = useState<Channels[]>();

  const queryClient = useQueryClient();

  const { setInviteChannelId } = useContext(PopupContext);

  useEffect(() => {
    if (data) {
      setChannels(data);
    }
  }, [data]);

  useEffect(() => {
    if (invitesData) {
      setInvites(invitesData);
    }
  }, [invitesData]);

  if (isLoading || isFetching) {
    return <Container>Loading..</Container>;
  }

  if (!channels || channels?.length === 0) {
    return (
      <div>
        <Invites invites={invites} />
        No channels
      </div>
    );
  }

  return (
    <Container>
      {invites.length > 0 && <Invites invites={invites} />}
      <Table
        channels={channels}
        actions={[
          {
            label: 'Add User',
            action: (channel) => setInviteChannelId(channel._id),
          },
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
