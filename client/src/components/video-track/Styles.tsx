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
  padding: 10px 0 3px 0;
  transition: opacity 0.3s ease;

  :active {
    opacity: 1;
  }
`;

export const Track = styled.div`
  pointer-events: none;
  background-color: #54545485;
  height: 5px;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
`;

export const Progress = styled.div`
  width: 100%;
  height: 5px;
  transform-origin: left;
  background-color: rgb(233, 14, 89);
  border-radius: 5px;
`;

export const Thumb = styled.div<{ pressed: boolean }>`
  position: absolute;
  width: 10px;
  height: 10px;
  left: 0;
  bottom: 0px;
  background-color: white;
  user-select: none;
  border-radius: 100%;
  transform: translateX(-50%);
  opacity: ${(p) => (p.pressed ? 1 : 0)};
  transition: opacity 0.3s ease;

  ::after {
    content: attr(data-title);
    background: #5c5c5c;
    position: absolute;
    top: -40px;
    height: 20px;
    width: auto;
    padding: 5px;
    border-radius: 5px;
    transform: translateX(-50%);
    color: white;
    font-size: 16px;
    font-family: 'RobotoMedium';
  }
`;
