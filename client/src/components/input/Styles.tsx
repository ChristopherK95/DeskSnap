import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background-color: white;
  border-radius: 3px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);
  position: relative;
  width: 250px;
  height: 50px;
  align-items: center;
`;

export const Label = styled.div<{ empty: boolean }>`
  position: absolute;
  top: ${(p) => (p.empty ? '14px' : '0px')};
  left: 10px;
  font-family: RobotoMedium;
  font-size: ${(p) => (p.empty ? '20px' : '12px')};
  color: gray;
  pointer-events: none;
  transition: top 0.3s ease;
`;

export const Value = styled.input`
  font-size: 16px;
  font-family: RobotoMedium;
  color: #272727;
  background-color: transparent;
  width: 100%;
  padding: 20px 0 0 10px;
  box-shadow: none;
  position: relative;
  height: 100%;
  width: 100%;

  &:focus ~ div {
    top: 0px;
    font-size: 12px;
  }
`;
