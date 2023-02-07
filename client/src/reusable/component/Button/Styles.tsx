import styled from 'styled-components';
import useColor from '../../hooks/useColor';

export const StyledButton = styled.button<{
  size: 'small' | 'normal';
  danger?: boolean;
}>`
  ${(p) => {
    if (p.size === 'small') {
      return `
      height: 30px;
      font-size: 14px;
    `;
    }
    return `
    height: 40px;
    font-size: 16px;
  `;
  }}
  background-color: ${(p) =>
    p.danger ? useColor('red') : useColor('lightOrange')};
  font-family: RobotoBold;
  border: none;
  border-radius: 6px;
  :hover {
    background-color: ${(p) =>
      p.danger ? useColor('redHover') : useColor('orange')};
  }
`;
