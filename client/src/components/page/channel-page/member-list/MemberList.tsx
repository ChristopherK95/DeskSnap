import { Channel } from '../../start-page/types';
import { Container, User } from './Styles';

const MemberList = (props: { channel: Channel }) => {
  return (
    <Container>
    <div>Users: </div>
      {props.channel.users.map((user, i) => <User key={i} >{user.username}</User>)}
    </Container>
  );
};

export default MemberList;
