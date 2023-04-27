import styled from 'styled-components';
import useColor from '../../../../../reusable/hooks/use-color';

export const Container = styled.div<{
  pressed: boolean;
  stillCursor: boolean;
  showBar: boolean;
}>`
  position: absolute;
  bottom: 0px;
  width: calc(100% - 20px);
  height: 0px;
  padding: 10px 0 0 0;
  transition: opacity 0.3s ease, padding-bottom 0.3s ease;
  user-select: none;
  display: flex;
  align-items: end;
  :active {
    opacity: 1;
  }

  ${(p) => p.stillCursor && !p.showBar && 'padding-bottom: 0px !important;'}

  ${(p) => p.showBar && ' padding-bottom: 40px !important;'}
  

  ${(p) => p.pressed && 'padding-bottom: 40px;'}
`;

export const Track = styled.div`
  position: relative;
  padding: 10px 0;
  height: 5px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;
  :hover ~ #thumb {
    opacity: 1 !important;
  }

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
  overflow: hidden;
`;

export const Progress = styled.div`
  width: 100%;
  height: 5px;
  transform-origin: left;
  background-color: ${() => useColor('orange')};
  user-select: none;
`;

export const Thumb = styled.div<{ pressed: boolean }>`
  position: absolute;
  width: 10px;
  height: 10px;
  left: 0;
  top: -5px;
  background-color: ${() => useColor('white')};
  user-select: none;
  border-radius: 100%;
  transform: ${(p) =>
    p.pressed ? 'translateX(-50%) scale(150%)' : 'translateX(-50%)'};
  opacity: ${(p) => (p.pressed ? 1 : 0)} !important;
  transition: opacity 0.3s ease, height 0.3s ease, width 0.3s ease;
  display: flex;
  justify-content: center;
  cursor: pointer;
  :hover {
    opacity: 1 !important;
  }

  ${(p) => p.pressed && '& ~ #tooltip { opacity: 1; }'}

  &:active ~ #tooltip {
    opacity: 1;
    transform: translate(0);
  }
`;

export const FullscreenButton = styled.div`
  position: absolute;
  right: 0;
  top: 15px;
  gap: 10px;
  cursor: pointer;
  svg {
    width: 25px;
    fill: ${useColor('fadedWhite')};
    transition: all 0.3s;
  }

  :hover {
    svg {
      fill: ${useColor('white')};
    }
  }
`;
