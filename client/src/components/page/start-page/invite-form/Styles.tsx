import styled from 'styled-components';
import useColor from '../../../../reusable/hooks/useColor';

export const Form = styled.div`
  font-family: RobotoMedium;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  padding: 30px;
`;

export const Title = styled.div`
  font-size: 24px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  position: relative;
  width: 100%;
  :hover {
    #rm {
      opacity: 1;
    }
  }
`;

export const AddInput = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background-color: ${useColor('lightOrange')};
  font-family: RobotoBold;
  border: none;
  border-radius: 6px;
  :hover {
    background-color: ${useColor('orange')};
  }
`;

export const RemoveInput = styled.div`
  display: flex;
  opacity: 0;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 3px;
  top: 2px;
  transition: all 0.3s ease;
`;
