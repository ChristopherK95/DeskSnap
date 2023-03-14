import styled from 'styled-components';
import useColor from '../../reusable/hooks/useColor';

export const Container = styled.div`
  width: 70px;
  height: 100%;
  background-color: ${useColor('black')};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
`;

export const StyledChannel = styled.div<{ selected?: boolean }>`
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  :after {
    content: '';
    background-color: ${useColor('white')};
    width: 4px;
    height: 60%;
    border-radius: 3px;
    position: absolute;
    left: 0px;
    display: ${(p) => (p.selected ? 'block' : 'none')};
  }
`;

export const Home = styled.div<{ selected: boolean }>`
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

  :hover {
    background-color: ${useColor('gray')};

    div:last-child {
      opacity: 1;
      transform: translateX(0);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
  }
`;

export const CreateChannel = styled.div`
  cursor: pointer;
  font-size: 40px;
  :hover {
    color: ${useColor('lightOrange')};
  }
  transition: all 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 55px;
  position: relative;
`;

export const MiscContainer = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const Profile = styled.div`
  cursor: pointer;
  :hover {
    color: ${useColor('lightOrange')};
  }
`;

export const LogoutButton = styled.div`
  width: 55px;
  height: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
