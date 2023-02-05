import styled from 'styled-components';
import useColor from '../../reusable/hooks/useColor';

export const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  width: 100vw;
`;

export const Content = styled.div`
  background-color: #313236;
  background-color: ${() => useColor('black')};
  width: 100%;
`;
