import OnBlurWrapper from '../OnBlurWrapper/OnBlurWrapper';
import { Close, Window } from './Styles';
import Cross from '../../../svgs/Cross';

const Modal = (props: {
  children: React.ReactNode;
  size?: { height: number | string; width: number | string };
  onClose: () => void;
}) => {
  return (
    <OnBlurWrapper onClose={props.onClose}>
      <Window size={props.size} tabIndex={1}>
        {props.children}
        <Close onClick={props.onClose}>
          <Cross />
        </Close>
      </Window>
    </OnBlurWrapper>
  );
};

export default Modal;
