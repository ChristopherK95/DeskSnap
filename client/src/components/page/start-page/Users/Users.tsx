import { useQueryClient } from 'react-query';
import ErrorIcon from '../../../../svgs/Cross';
import { fetchOnce } from '../../../hooks/useFetch';
import { Channel } from '../types';
import { Close, Container, Kick, List, Owner, Title, User } from './Styles';

const Users = (props: {
  channel: Channel;
  currentUser: {
    id: string;
    username: string;
    isLoggedIn: boolean;
  };
  setShowUsers: (channel: number | undefined) => void;
}) => {
  const queryClient = useQueryClient();

  const kick = async (user: string) => {
    await fetchOnce<'channel'>({
      action: 'channel/removeUser',
      payload: { user_id: user, channel_id: props.channel._id },
    });
    queryClient.invalidateQueries('channels-overview');
  };

  return (
    <Container>
      <Title>{props.channel.channel_name}</Title>
      <List>
        {props.channel.users.map((user, i) => (
          <User key={i}>
            {user.username}
            {user.username === props.channel.owner.username && (
              <Owner>{'(owner)'}</Owner>
            )}
            {props.channel.owner.username === props.currentUser.username &&
              user.username !== props.channel.owner.username && (
                <Kick onClick={() => kick(user.id)}>Kick</Kick>
              )}
          </User>
        ))}
      </List>
      <Close onClick={() => props.setShowUsers(undefined)}>
        <ErrorIcon />
      </Close>
    </Container>
  );
};

export default Users;
