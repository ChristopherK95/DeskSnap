import styled from 'styled-components';
import EllipsisIcon from '../../../svgs/Ellipsis';
import { useState } from 'react';
import ContextMenu from '../../context-menu/ContextMenu';

const Icon = styled.div`
  width: 30px;
  fill: #bbbbbb;
  position: relative;
  cursor: pointer;
  :hover {
    svg {
      fill: #ffffff;
    }
  }
`;

const Ellipsis = (props: {
  actions: { label: React.ReactNode; action: () => void }[];
}) => {
  const [showContext, setShowContext] = useState<boolean>(false);

  return (
    <Icon
      onClick={() => {
        setShowContext(true);
      }}
    >
      <EllipsisIcon />
      {showContext && (
        <ContextMenu
          actions={props.actions}
          close={() => setShowContext(false)}
        />
      )}
    </Icon>
  );
};

export default Ellipsis;
