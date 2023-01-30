import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  bottom: 0px;
  width: calc(100% - 20px);
  height: 50px;
  padding: 10px 0;
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
`;

export const Track = styled.div`
  background-color: #54545485;
  height: 5px;
  padding: 5px 0;
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  user-select: none;
  :hover ~ #tooltip {
    opacity: 1;
  }
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
  width: ${(p) => (p.pressed ? '15px' : '10px')};
  height: ${(p) => (p.pressed ? '15px' : '10px')};
  left: 0;
  background-color: white;
  user-select: none;
  border-radius: 100%;
  transform: translateX(-50%);
  opacity: ${(p) => (p.pressed ? 1 : 0)};
  transition: opacity 0.3s ease, height 0.3s ease, width 0.3s ease;
  display: flex;
  justify-content: center;

  ${(p) => p.pressed && '& ~ #tooltip { opacity: 1; }'}

  &:active ~ #tooltip {
    opacity: 1;
    transform: translate(0);
  }
`;

export const VolumeContainer = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  gap: 10px;
`;

export const Volume = styled.input`
  display: none;
`;

export const Mute = styled.div`
  display: none;
  background-color: white;
  border-radius: 100%;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
