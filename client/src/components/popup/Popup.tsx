import { useEffect, useRef } from 'react';
import Button from '../../reusable/components/Button/Button';
import OnBlurWrapper from '../../reusable/components/OnBlurWrapper/OnBlurWrapper';
import { ButtonContainer, Cancel, Window } from './Styles';

const Popup = (props: {
  children: React.ReactNode;
  size?: { height: number | string; width: number | string };
  showPopup: boolean;
  buttonText?: string;
  danger?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const ref = useRef({} as HTMLDivElement);

  useEffect(() => {
    ref.current?.focus();
  }, [props.showPopup]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current.contains(e.target as HTMLElement)) {
        props.onClose();
      }
    };
    window.addEventListener('mousedown', onClick);

    return () => window.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <OnBlurWrapper onClose={props.onClose}>
      <Window ref={ref} size={props.size} tabIndex={1}>
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
    </OnBlurWrapper>
  );
};

export default Popup;
