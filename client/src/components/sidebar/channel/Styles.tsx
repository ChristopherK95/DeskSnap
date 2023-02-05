import styled from 'styled-components';
import useColor from '../../../reusable/hooks/useColor';

export const Channel = styled.div<{ selected: boolean }>`
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  :after {
    content: '';
    background-color: ${() => useColor('white')};
    width: 4px;
    height: 60%;
    border-radius: 3px;
    position: absolute;
    left: 0px;
    display: ${(p) => (p.selected ? 'block' : 'none')};
  }
`;

export const Circle = styled.div<{ selected: boolean }>`
  background-color: ${() => useColor('darkGray')};
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: 'RobotoMedium';
  font-size: 22px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;

  :hover {
    background-color: ${useColor('gray')};
  }
`;
