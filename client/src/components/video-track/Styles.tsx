import styled, { createGlobalStyle } from 'styled-components';
import RobotoMedium from '../../fonts/Roboto/Roboto-Medium.ttf';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "RobotoMedium";
    src: url(${RobotoMedium}) format("truetype");
    font-weight: regular;
    font-style: normal;
    font-display: auto;
  }
`;

export const Container = styled.div`
  opacity: 0;
  position: absolute;
  bottom: 0px;
  width: calc(100% - 20px);
  height: 5px;
  cursor: pointer;
  padding: 10px 0;
  transition: opacity 0.3s ease;
  user-select: none;
  display: flex;
  align-items: center;

  :active {
    opacity: 1;
  }

  :hover {
    #thumb {
      opacity: 1;
    }

    #tooltip {
      opacity: 1;
      transform: translate(0);
    }
  }
`;

export const Track = styled.div`
  pointer-events: none;
  background-color: #54545485;
  height: 5px;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  user-select: none;
`;

export const Progress = styled.div`
  pointer-events: none;
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
