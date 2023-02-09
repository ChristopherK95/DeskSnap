import { useEffect, useRef } from 'react';
import Button from '../../reusable/component/Button/Button';
import { BackDrop, ButtonContainer, Cancel, Window } from './Styles';

const Modal = (props: {
  children: React.ReactNode;
  size?: { height: number | string; width: number | string };
  showModal: boolean;
  buttonText?: string;
  danger?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const ref = useRef({} as HTMLDivElement);
  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      props.onClose();
    }
  };

  useEffect(() => {
    ref.current?.focus();
  }, [props.showModal]);

  return (
    <BackDrop show={props.showModal}>
      <Window
        ref={ref}
        size={props.size}
        tabIndex={1}
        onBlur={(e) => handleBlur(e)}
      >
        {props.children}
        <ButtonContainer>
          <Cancel onClick={props.onClose}>Cancel</Cancel>
          <Button
            onClick={() => {
              props.onConfirm();
              props.onClose();
            }}
            danger={props.danger}
          >
            {props.buttonText ?? 'Confirm'}
          </Button>
        </ButtonContainer>
      </Window>
    </BackDrop>
  );
};

export default Modal;
