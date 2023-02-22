import styled from 'styled-components';
import useColor from '../../../reusable/hooks/useColor';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const Profile = styled.div`
  position: absolute;
  left: 30px;
  top: 30px;
  font-size: 30px;
  cursor: pointer;
  :hover {
    color: ${useColor('lightOrange')};
  }
  text-transform: capitalize;
`;
