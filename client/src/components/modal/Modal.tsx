import { BackDrop, Window } from './Styles';

const Modal = (props: {
  children: React.ReactNode;
  size?: { height: number; width: number };
}) => {
  return (
    <BackDrop>
      <Window size={props.size}>{props.children}</Window>
    </BackDrop>
  );
};

export default Modal;
