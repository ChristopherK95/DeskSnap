import styled from 'styled-components';
import useColor from '../../../reusable/hooks/useColor';

export const Page = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${useColor('darkGray')};
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 25%;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: ${useColor('gray')};
  box-shadow: -1px 1px 2px 2px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
`;

export const DropContainer = styled.div<{ empty: boolean }>`
  display: flex;
  flex-direction: column;
  border: ${(p) =>
    p.empty
      ? `3px dashed ${useColor('white')}`
      : `3px solid ${useColor('gray')}`};
  min-height: 150px;
  padding: 20px;
  justify-content: ${(p) => (p.empty ? 'center' : 'flex-end')};
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
`;

export const Upload = styled.div`
  background-color: ${useColor('lightOrange')};
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  width: 100%;
`;

export const Label = styled.label`
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;
  width: 200px;
  font-size: 16px;
  line-height: 25px;
  cursor: pointer;
  padding: 15px 10px 15px 20px;
`;

export const Icon = styled.label`
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

export const Files = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 260px;
`;

export const FileRow = styled.div`
  display: flex;
  padding: 5px 0;
`;

export const Filename = styled.label`
  padding: 5px 0 5px 5px;
  text-align: start;
  width: 70%;
  height: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const FileOptions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px 0px 5px 0;
  width: 30%;
  svg {
    fill: ${useColor('red')};
    width: 25px;
    cursor: pointer;
    :hover {
      fill: ${useColor('redHover')};
    }
  }
`;
