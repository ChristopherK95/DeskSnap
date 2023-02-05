import styled from 'styled-components';
import useColor from '../../../../reusable/hooks/useColor';

export const Title = styled.th`
  background: linear-gradient(
    to bottom,
    ${() => useColor('orange')},
    ${() => useColor('lightOrange')}
  );
  color: ${() => useColor('white')};
  font-family: RobotoBold;
  font-size: 30px;
  height: 60px;
  border-radius: 5px 5px 0 0;
`;

export const Table = styled.table`
  width: 800px;
  border-spacing: 0;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.3);
`;

export const Row = styled.tr<{ index: number }>`
  background-color: ${(p) =>
    p.index % 2 === 1 ? useColor('black') : useColor('gray')};
`;

export const Header = styled.th`
  background-color: ${() => useColor('black')};
  font-size: 22px;
  padding: 5px 10px;
  :not(:last-child) {
    border-right: 2px solid ${() => useColor('gray')};
  }
`;

export const Cell = styled.td`
  text-align: start;
  font-size: 20px;
  padding: 5px 0 5px 15px;
`;
