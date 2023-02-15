import { useContext, useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { Container } from './Styles';
import Table from './table/Table';
import Edit from './Edit';
import InviteForm from './invite-form/InviteForm';
import Invites, { Invite } from './invites/Invites';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { PopupContext } from '../../popup/PopupContext';
import Modal from '../../../reusable/components/Modal/Modal';
import Users from './Users/Users';
import { Channel } from './types';
import LeaveOrDelete from './leave-or-delete-channel/LeaveOrDelete';

const StartPage = (props: { userId: string }) => {
  const user = useSelector((state: RootState) => state.user);
  // const dispatch = useDispatch();
  const { data, isLoading, isFetching } = useFetch<'channel', Channel[]>({
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
  const [channels, setChannels] = useState<Channel[]>();
  const [showUsers, setShowUsers] = useState<number>();

  const { setInviteChannelId, setLeaveOrDeleteChannel } =
    useContext(PopupContext);

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

  // if (isLoading || isFetching) {
  //   return <Container>Loading..</Container>;
  // }

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
        setShowUsers={setShowUsers}
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
              setLeaveOrDeleteChannel(channel as Channel);
            },
          },
        ]}
      />
      {showUsers !== undefined && (
        <Modal onClose={() => setShowUsers(undefined)}>
          <Users
            channel={channels[showUsers]}
            currentUser={user}
            setShowUsers={setShowUsers}
          />
        </Modal>
      )}
      <LeaveOrDelete user={user} />
      <InviteForm />
    </Container>
  );
};

export default StartPage;
