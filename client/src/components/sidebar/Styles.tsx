import styled from 'styled-components';

export const Container = styled.div`
  width: 70px;
  height: 100%;
  background-color: #252424;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
`;

export const Channel = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Circle = styled.div<{ selected: boolean }>`
  background-color: #363636;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: 'RobotoMedium';
  font-size: 22px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
  border: ${(p) => (p.selected ? '4px solid #01e783' : 'none')};

  :hover {
    background-color: #4e4d4d;

    /* div:last-child {
      opacity: 1;
      transform: translateX(0);
      transition: opacity 0.3s ease, transform 0.3s ease;
    } */
  }
`;

export const Home = styled.div<{ selected: boolean }>`
  background-color: ${(p) => (p.selected ? '#666666' : '')};
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: 'RobotoMedium';
  font-size: 22px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
  /* border: ${(p) => (p.selected ? '4px solid #01e783' : 'none')}; */

  :hover {
    background-color: #4e4d4d;

    div:last-child {
      opacity: 1;
      transform: translateX(0);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
  }
`;

export const AddChannel = styled.div`
  cursor: pointer;
  font-size: 40px;
  :hover {
    color: #ff8e38;
  }
`;
