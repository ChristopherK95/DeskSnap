import styled from 'styled-components';
import useColor from '../../../../reusable/hooks/use-color';

export const Container = styled.div`
  height: 100%;
  width: 120px;
  position: absolute;
  right: 0;
  padding: 20px;
  background-color: ${useColor('black')};
`;

export const StatusContainer = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100px;
`;

export const Status = styled.span`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const User = styled.span`
  font-size: 18px;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-align: start;
  user-select: none;
`;
