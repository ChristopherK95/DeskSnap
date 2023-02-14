import OnBlurWrapper from '../OnBlurWrapper/OnBlurWrapper';
import { Window } from './Styles';

const Modal = (props: {
  children: React.ReactNode;
  size?: { height: number | string; width: number | string };
  onClose: () => void;
}) => {
  return (
    <OnBlurWrapper onClose={props.onClose}>
      <Window size={props.size} tabIndex={1}>
        {props.children}
      </Window>
    </OnBlurWrapper>
  );
};

export default Modal;
