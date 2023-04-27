import { Container, Text, Title } from './Styles';
import { useContext } from 'react';
import Popup from '../../../popup/Popup';
import { fetchOnce } from '../../../hooks/useFetch';
import { User } from '../types';
import { PopupContext } from '../../../popup/PopupContext';
import { useQueryClient } from 'react-query';
import useNotify from '../../../../reusable/hooks/use-notify';

const LeaveOrDelete = (props: { user: User }) => {
  const { leaveOrDeleteChannel, setLeaveOrDeleteChannel } =
    useContext(PopupContext);
  const notify = useNotify();
  const queryClient = useQueryClient();

  const leaveOrDelete = async () => {
    const { status } = await fetchOnce<'channel'>({
      action: 'channel/removeChannel',
      payload: {
        user_id: props.user.id,
        channel_id: leaveOrDeleteChannel?._id,
      },
    });
    if (status === 200) {
      notify('Removed channel successfully!');
      queryClient.invalidateQueries('channels-overview');
      queryClient.invalidateQueries('sidebar-channels');
    } else {
      notify('Failed to remove channel!', undefined, true);
    }
  };
  return (
    <>
      {leaveOrDeleteChannel && (
        <Popup
          onClose={() => setLeaveOrDeleteChannel(undefined)}
          onConfirm={leaveOrDelete}
          showPopup={Boolean(leaveOrDeleteChannel)}
          danger={true}
          buttonText={
            leaveOrDeleteChannel.owner.username === props.user.username
              ? 'Delete'
              : 'Leave'
          }
        >
          <Container>
            <Title>
              <h2>{`${
                leaveOrDeleteChannel.owner.username === props.user.username
                  ? 'Deleting'
                  : 'Leaving'
              } ${leaveOrDeleteChannel.channel_name}`}</h2>
            </Title>
            <Text>
              <div>{`Are you sure you want to ${
                leaveOrDeleteChannel.owner.username === props.user.username
                  ? 'delete the channel'
                  : 'leave'
              }?`}</div>
            </Text>
          </Container>
        </Popup>
      )}
    </>
  );
};
export default LeaveOrDelete;
