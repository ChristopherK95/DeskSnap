import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #28282c;
  position: absolute;
  min-width: 100px;
  border-radius: 5px;
  z-index: 1000;
  left: calc(100% + 10px);
  top: 15px;
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: max-content;
`;

export const ContextItem = styled.div`
  padding: 5px 10px;
  :hover {
    background-color: #434347;
  }
`;
