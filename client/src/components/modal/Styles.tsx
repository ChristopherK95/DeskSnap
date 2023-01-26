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
  width: 400px;
  padding: 10px;
  background-color: #2d3250;
  border-radius: 8px;

  ${(p) => p.size && `height: ${p.size.height}px; width: ${p.size.width}px;`}
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);
`;
