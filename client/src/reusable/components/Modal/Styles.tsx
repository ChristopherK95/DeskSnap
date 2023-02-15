import styled from 'styled-components';
import useColor from '../../hooks/useColor';

export const Window = styled.div<{
  size?: { height: number | string; width: number | string };
}>`
  background-color: ${useColor('gray')};
  border-radius: 8px 8px 0 0;
  font-family: RobotoMedium;
  ${(p) => p.size && `height: ${p.size.height}px; width: ${p.size.width}px;`}
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.8);
  display: grid;
  min-height: 150px;
  min-width: 300px;
  position: relative;
  bottom: 60px;
`;
