import styled from 'styled-components';
import EllipsisIcon from '../../../svgs/Ellipsis';
import { useState } from 'react';
import ContextMenu from '../../context-menu/ContextMenu';
import { Channel } from './types';

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
  channel: Channel;
  actions: { label: React.ReactNode; action: (channel: Channel) => void }[];
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
          row={props.channel}
          actions={props.actions}
          close={() => setShowContext(false)}
        />
      )}
    </Icon>
  );
};

export default Ellipsis;
