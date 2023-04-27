import styled from 'styled-components';
import useColor from '../../../reusable/hooks/use-color';

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
  left: 40px;
  top: 40px;
  font-size: 40px;
  cursor: pointer;
  :hover {
    color: ${useColor('lightOrange')};
  }
  transition: all 0.2s ease-in-out;
  text-transform: capitalize;
`;
