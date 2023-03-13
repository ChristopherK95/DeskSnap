import styled, { keyframes } from 'styled-components';
import useColor from '../../../../reusable/hooks/useColor';

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: ${useColor('gray')};
  box-shadow: 0 0 3px 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

export const DropContainer = styled.div<{
  empty: boolean;
  dragActive: boolean;
}>`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: ${(p) =>
    p.empty || p.dragActive
      ? `3px dashed ${useColor('white')}`
      : `3px solid ${useColor('gray')}`};
  min-height: 150px;
  padding: ${(p) => (p.empty ? '25px' : '25px')};
  justify-content: ${(p) => (p.empty ? 'center' : 'flex-start')};
`;

export const InputContainer = styled.div<{ empty: boolean }>`
  position: relative;
  display: flex;
  justify-content: ${(p) => (p.empty ? 'center' : 'flex-start')};
`;

export const ChooseFiles = styled.div`
  background-color: ${useColor('lightOrange')};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  box-shadow: -2px 2px 2px 3px rgba(0, 0, 0, 0.4);
  :hover {
    background-color: ${useColor('orange')};
  }
  :active {
    transform: scale(0.95);
    box-shadow: none;
  }
  transition: all 0.2s;
`;

export const ChooseLabel = styled.label`
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;
  width: 200px;
  font-size: 16px;
  line-height: 25px;
  cursor: pointer;
  padding: 15px 10px 15px 20px;
  text-shadow: -1px 1px 2px rgba(0, 0, 0, 0.6);
`;

export const ChooseIcon = styled.label`
  margin: 0;
  padding: 15px 20px 15px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 30px;
    fill: ${useColor('white')};
  }
  cursor: pointer;
`;

export const AddMore = styled.div`
  background-color: ${useColor('darkGray')};
  border-radius: 6px;
  display: flex;
  border: 2px solid transparent;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  :hover {
    background-color: ${useColor('orange')};
  }
  :active {
    transform: scale(0.95);
    box-shadow: none;
  }
  transition: all 0.2s;
  margin-bottom: 20px;
`;

export const AddMoreLabel = styled.label`
  padding: 10px 10px 10px 0;
  cursor: pointer;
`;

export const AddMoreIcon = styled.label`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: white;
    width: 15px;
  }
`;

export const Files = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
`;

export const FileRow = styled.div`
  display: flex;
  padding: 5px 0;
  height: 50px;
  :not(:last-child) {
    border-bottom: 2px solid ${useColor('lightGray')};
  }
  :hover {
    transform: scale(1.05);
    background-color: ${useColor('peach')};
    border-color: ${useColor('peach')};
    border-radius: 4px;
  }
  transition: all 0.2s;
  cursor: pointer;
`;

export const Filename = styled.div`
  padding: 5px 10px 5px 5px;
  text-align: start;
  width: 70%;
  height: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const FileSize = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 5px 10px 5px 10px;
  width: 30%;
`;

export const FileOptions = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 0px 5px 0;
  width: 20%;
  svg {
    fill: ${useColor('darkGray')};
    width: 25px;
    cursor: pointer;
    :hover {
      fill: ${useColor('redHover')};
    }
  }
`;

export const Submit = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const Loader = styled.span`
  width: 30px;
  height: 30px;
  border: 3px solid #fff;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  ::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 4px solid transparent;
    border-bottom-color: ${useColor('lightOrange')};
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
