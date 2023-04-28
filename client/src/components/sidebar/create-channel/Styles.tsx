import styled from 'styled-components';
import useColor from '../../../reusable/hooks/use-color';

export const Container = styled.div`
  cursor: pointer;
  font-size: 40px;
  :hover {
    color: ${useColor('lightOrange')};
  }
  transition: all 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 55px;
  position: relative;
`;
