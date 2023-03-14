import styled from 'styled-components';

export const Container = styled.div`
  cursor: pointer;
  :hover {
    svg {
      fill: #fa7646;
    }
  }
  svg {
    transition: fill 0.3s ease;
    fill: #ff9060;
    width: 50px;
  }
`;

export const LogoutContainer = styled.div`
  width: 400px;
  height: 200px;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
`;

export const Title = styled.div`
  padding: 0 20px;
  display: flex;
`;

export const Text = styled.div`
  display: flex;
  padding: 0 20px;
`;
