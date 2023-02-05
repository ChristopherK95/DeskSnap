import styled from 'styled-components';

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

export const State = styled.div`
  width: 120px;
  height: 120px;
  background-color: #94929250;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
