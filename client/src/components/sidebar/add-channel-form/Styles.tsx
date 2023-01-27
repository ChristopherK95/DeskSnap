import styled from 'styled-components';

export const Form = styled.form`
  font-family: RobotoMedium;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Title = styled.div`
  font-size: 30px;
`;

export const Button = styled.button`
  width: 250px;
  font-family: RobotoBold;
  background-color: #f9b17a;
  color: #2d3250;
  box-shadow: 0 0 6px 0.5px #ff8e38;
  outline: none;
  border: none;
  :hover {
    background-color: #fd9f56;
  }
`;
