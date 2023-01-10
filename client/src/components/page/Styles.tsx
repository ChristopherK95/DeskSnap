import styled from 'styled-components';

export const Content = styled.div`
  background-color: #313236;
  width: -webkit-fill-available;
`;

export const Sidebar = styled.div`
  width: 70px;
  height: 100%;
  background-color: #252424;
  display: flex;
  flex-direction: column;
  align-items: center;
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

    div:last-child {
      opacity: 1;
      transform: translateX(0);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
  }
`;

export const Tooltip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #252424;
  padding: 5px 10px;
  color: white;
  font-family: 'RobotoMedium';
  font-size: 16px;
  position: absolute;
  left: 160%;
  transform: translateX(-50px);
  border-radius: 5px;
  box-shadow: -2px 2px 5px 2px rgba(0, 0, 0, 0.2);
  transition: opacity 0.2s ease, transform 0.1s ease;
  opacity: 0;

  :after {
    content: '';
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #252424;
    position: absolute;
    left: -10px;
  }
`;
