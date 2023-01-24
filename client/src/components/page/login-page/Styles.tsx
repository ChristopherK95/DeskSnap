import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 40px;
  grid-gap: 30px;
`;
