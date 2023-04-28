import styled from 'styled-components';
import useColor from '../../../../reusable/hooks/use-color';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
`;

export const Title = styled.div`
  position: relative;
  font-size: 24px;
  width: 100%;
  padding: 10px;
  text-shadow: -2px 1px 1px rgba(0, 0, 0, 0.6);
  background: linear-gradient(
    to bottom,
    ${useColor('orange')},
    ${useColor('lightOrange')}
  );
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const User = styled.div`
  position: relative;
  display: flex;
  padding: 5px;
`;

export const Owner = styled.span`
  margin-left: 5px;
  opacity: 0.5;
`;

export const Kick = styled.div`
  position: absolute;
  right: 5px;
  font-family: RobotoBold;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  color: ${useColor('denyRed')};
`;
