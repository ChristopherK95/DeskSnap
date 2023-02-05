import { CSSProperties } from 'styled-components';
import { StyledTooltip } from './Styles';
import React from 'react';

export type Direction = 'left' | 'right' | 'up' | 'down';
interface Props {
  direction: Direction;
  value: string;
  visible: boolean;
  transparent?: boolean;
  style?: CSSProperties;
}

const Tooltip = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <StyledTooltip
      id="tooltip"
      ref={ref}
      direction={props.direction}
      visible={props.visible}
      transparent={props.transparent}
      style={props.style}
    >
      {props.value}
    </StyledTooltip>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
