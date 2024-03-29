import { useContext, useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { Container, Profile } from './Styles';
import Table from './table/Table';
import Edit from './Edit';
import InviteForm from './invite-form/InviteForm';
import Invites from './invites/Invites';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { PopupContext } from '../../popup/PopupContext';
import Modal from '../../../reusable/components/Modal/Modal';
import Users from './Users/Users';
import { Channel, Invite } from './types';
import LeaveOrDelete from './leave-or-delete-channel/LeaveOrDelete';
import { SidebarContext } from '../../sidebar/SidebarContext';
import EditChannel from './edit-channel/EditChannel';

const StartPage = (props: { userId: string; channels: Channel[] }) => {
  const user = useSelector((state: RootState) => state.user);
  const { setActiveChannel } = useContext(SidebarContext);

  const invitesData = useFetch<'user', Invite[]>({
    action: 'user/getInvites',
    payload: { user_id: user.id },
    key: 'get-invites',
    options: { refetchOnWindowFocus: false },
  }).data;

  const [invites, setInvites] = useState<Invite[]>([]);
  const [showUsers, setShowUsers] = useState<number>();

  const { setInviteChannelId, setLeaveOrDeleteChannel, setShowEdit } =
    useContext(PopupContext);


  useEffect(() => {
    if (invitesData) {
      setInvites(invitesData);
    }
  }, [invitesData]);

  // if (isLoading || isFetching) {
  //   return <Container>Loading..</Container>;
  // }

  if (!props.channels || props.channels?.length === 0) {
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
        channels={props.channels}
        actions={[
          {
            label: 'Add User',
            action: (channel) => setInviteChannelId(channel._id),
          },
          {
            label: <Edit />,
            action: (channel) => setShowEdit(channel),
          },
          {
            label: 'Delete',
            action: async (channel) => {
              setLeaveOrDeleteChannel(channel);
            },
          },
        ]}
      />
      <Profile onClick={() => setActiveChannel({id: '', channelName: 'profile'})}>
        {user.username}
      </Profile>
      {showUsers !== undefined && (
        <Modal onClose={() => setShowUsers(undefined)}>
          <Users
            channel={props.channels[showUsers]}
            currentUser={user}
            setShowUsers={setShowUsers}
          />
        </Modal>
      )}
      <EditChannel />
      <LeaveOrDelete user={user} />
      <InviteForm />
    </Container>
  );
};

export default StartPage;
