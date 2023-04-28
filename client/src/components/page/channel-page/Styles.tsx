import styled from 'styled-components';
import useColor from '../../../reusable/hooks/use-color';

export const Page = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${useColor('darkGray')};
  height: 100%;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;
