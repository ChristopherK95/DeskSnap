import styled, { css } from 'styled-components';
import { Direction } from './Tooltip';
import { match } from 'ts-pattern';
import useColor from '../../reusable/hooks/useColor';

const right = css`
  position: absolute;
  left: 120%;
`;

const left = css`
  position: absolute;
  transform: translateX(80%);
  right: 130%;
`;

const up = css`
  position: absolute;
  transform: translateY(80%);
  bottom: 150%;
`;

const down = css`
  position: absolute;
  transform: translateY(-80%);
  top: 110%;
`;

export const StyledTooltip = styled.div<{
  direction: Direction;
  visible: boolean;
  transparent?: boolean;
}>`
  ${(p) => {
    return match<Direction>(p.direction)
      .with('left', () => left)
      .with('right', () => right)
      .with('up', () => up)
      .with('down', () => down)
      .exhaustive();
  }}
  ${(p) => {
    if (p.transparent) {
      return {
        backgroundColor: 'transparent',
        padding: 0,
      };
    }

    return {
      backgroundColor: useColor('black'),
      padding: '5px 10px',
    };
  }}

  ${(p) => {
    if (p.visible) {
      return {
        opacity: 1,
        transform: 'translate(0)',
      };
    }

    return {
      opacity: 0,
    };
  }}
  pointer-events: none;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${() => useColor('white')};
  font-family: 'RobotoMedium';
  font-size: 16px;
  position: absolute;
  border-radius: 5px;
  box-shadow: -2px 2px 5px 2px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease, transform 0.2s ease;
`;
