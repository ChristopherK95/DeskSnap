import React, { useLayoutEffect, useRef } from 'react';
import { Container, ContextItem } from './Styles';

const ContextMenu = (props: {
  actions: { label: React.ReactNode; action: () => void }[];
  close: () => void;
}) => {
  const ref = useRef({} as HTMLDivElement);

  useLayoutEffect(() => ref.current.focus(), []);

  return (
    <Container ref={ref} id="context" tabIndex={0} onBlur={() => props.close()}>
      {props.actions.map((action, idx) => (
        <ContextItem
          key={idx}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            action.action();
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