import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Container, ContextItem } from './Styles';

const ContextMenu = <T,>(props: {
  row: T;
  actions: { label: React.ReactNode; action: (row: T) => void }[];
  close: () => void;
}) => {
  const ref = useRef({} as HTMLDivElement);

  useLayoutEffect(() => ref.current.focus(), []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current.contains(e.target as HTMLElement)) {
        props.close();
      }
    };
    window.addEventListener('mousedown', onClick);

    return () => window.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <Container ref={ref} id="context" tabIndex={0}>
      {props.actions.map((action, idx) => (
        <ContextItem
          key={idx}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            action.action(props.row);
            props.close();
          }}
        >
          {action.label}
        </ContextItem>
      ))}
    </Container>
  );
};

export default ContextMenu;
