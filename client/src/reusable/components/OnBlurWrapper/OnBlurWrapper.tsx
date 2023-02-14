import { useEffect, useRef } from 'react';
import styled from 'styled-components';

export const BackDrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const OnBlurWrapper = (props: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const ref = useRef({} as HTMLDivElement);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        !ref.current.contains(e.target as HTMLElement) ||
        (e.target as HTMLElement) === ref.current
      ) {
        props.onClose();
      }
    };
    window.addEventListener('mousedown', onClick);

    return () => window.removeEventListener('mousedown', onClick);
  }, []);

  return <BackDrop ref={ref}>{props.children}</BackDrop>;
};

export default OnBlurWrapper;
