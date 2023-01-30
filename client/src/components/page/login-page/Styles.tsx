import styled from 'styled-components';

export const Form = styled.form`
  font-family: RobotoMedium;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2d3250;
`;

export const Input = styled.input`
  background-color: white;
  border-radius: 3px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);
  color: #272727;
  font-size: 16px;
  font-family: RobotoMedium;
  padding: 5px;
  width: 250px;
`;

export const ButtonContainer = styled.div`
  width: 250px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px;
  grid-gap: 10px;
  button {
    font-family: RobotoBold;
    background-color: #f9b17a;
    color: #2d3250;
    box-shadow: 0 0 6px 0.5px #ff8e38;
    outline: none;
    border: none;
    :hover {
      background-color: #fd9f56;
    }
  }
`;

export const Link = styled.span`
  color: #fd9f56;
  filter: drop-shadow(0 0 2px #ffb37a);
  cursor: pointer;
  :hover {
    filter: drop-shadow(0 0 3px #ffbc89);
    color: #ffbc89;
  }
`;
