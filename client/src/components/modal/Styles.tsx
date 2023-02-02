import styled from 'styled-components';

export const BackDrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const Window = styled.div<{ size?: { height: number; width: number } }>`
  background-color: #2d3250;
  border-radius: 8px 8px 0 0;
  font-family: RobotoMedium;
  ${(p) => p.size && `height: ${p.size.height}px; width: ${p.size.width}px;`}
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.8);
  display: grid;
  min-height: 150px;
  min-width: 300px;
  position: relative;
  bottom: 60px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0 10px;
  justify-content: end;
  background-color: #23273d;
  border-radius: 0 0px 10px 10px;
  align-items: center;
  gap: 20px;
  position: absolute;
  top: 100%;
  box-shadow: 0 6px 3px 3px rgba(0, 0, 0, 0.8);
`;

export const Cancel = styled.div`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export const Button = styled.button<{ danger?: boolean }>`
  height: 40px;
  background-color: ${(p) => (p.danger ? '#af0202' : '#ff9060')};
  font-family: RobotoBold;
  border: none;
  border-radius: 6px;
  :hover {
    background-color: ${(p) => (p.danger ? '#990404' : '#fa7646')};
  }
`;
