import styled from 'styled-components';

export const Container = styled.div<{ pressed: boolean }>`
  position: absolute;
  bottom: 0px;
  width: calc(100% - 20px);
  height: 0px;
  padding: 10px 0 0 0;
  transition: opacity 0.3s ease;
  user-select: none;
  display: flex;
  align-items: end;

  :active {
    opacity: 1;
  }

  :hover {
    padding-bottom: 50px;
    #thumb {
      opacity: 1;
    }

    /* #tooltip {
      opacity: 1;
      transform: translate(0);
    } */
  }

  ${(p) => p.pressed && 'padding-bottom: 50px;'}
`;

export const Track = styled.div`
  position: relative;
  padding: 10px 0;
  height: 5px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  overflow: hidden;
  user-select: none;
  :hover ~ #tooltip {
    opacity: 1;
  }
`;

export const Backdrop = styled.div`
  position: absolute;
  height: 5px;
  width: 100%;
  left: 0;
  background-color: #54545485;
  user-select: none;
`;

export const Progress = styled.div`
  /* pointer-events: none; */
  width: 100%;
  height: 5px;
  transform-origin: left;
  background-color: rgb(233, 14, 89);
  border-radius: 5px;
  user-select: none;
`;

export const Thumb = styled.div<{ pressed: boolean }>`
  position: absolute;
  width: 10px;
  height: 10px;
  left: 0;
  top: -4px;
  background-color: white;
  user-select: none;
  border-radius: 100%;
  transform: ${(p) =>
    p.pressed ? 'translateX(-50%) scale(150%)' : 'translateX(-50%)'};
  opacity: ${(p) => (p.pressed ? 1 : 0)};
  transition: opacity 0.3s ease, height 0.3s ease, width 0.3s ease;
  display: flex;
  justify-content: center;
  cursor: pointer;

  ${(p) => p.pressed && '& ~ #tooltip { opacity: 1; }'}

  &:active ~ #tooltip {
    opacity: 1;
    transform: translate(0);
  }
`;
