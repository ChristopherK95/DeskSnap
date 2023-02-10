import styled from 'styled-components';
import useColor from '../../../../reusable/hooks/useColor';

export const Container = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  animation-name: ${(p) => (p.visible ? 'enter' : 'leave')};
  animation-duration: ${(p) => (p.visible ? '0.8s' : '0.4s')};
  animation-fill-mode: forwards;

  @keyframes enter {
    0% {
      transform: translateY(-90px);
    }
    70% {
      transform: translateY(15px);
    }
    75% {
      transform: translateY(15px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  @keyframes leave {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-90px);
    }
  }
`;

export const InvitesButton = styled.div`
  background-color: ${() => useColor('darkGray')};
  cursor: pointer;
  padding: 15px;
  border-radius: 100%;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);

  :hover {
    background-color: ${() => useColor('gray')};
  }
`;

export const StyledIcon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: white;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  position: absolute;
  top: 30px;
  right: calc(100% + 10px);
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.3);
  overflow: auto;
  width: 500px;
  min-height: 132px;
  max-height: 220px;
`;

export const Row = styled.div<{ index: number }>`
  display: grid;
  grid-template-columns: 4fr 2fr 1fr;
  align-items: center;
  background-color: ${(p) =>
    p.index % 2 === 0 ? useColor('darkGray') : useColor('gray')};
  padding: 10px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;

  svg {
    height: 20px;
    width: 20px;
    cursor: pointer;

    :hover {
      opacity: 0.7;
    }
  }
`;

export const Cell = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  flex-wrap: nowrap;
  color: ${() => useColor('white')};
  font-family: RobotoMedium;
  font-size: 20px;
  text-align: start;
`;
