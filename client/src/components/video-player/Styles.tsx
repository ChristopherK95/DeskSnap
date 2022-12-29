import styled from 'styled-components';

export const VideoContaier = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  box-shadow: -3px 3px 3px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Video = styled.video`
  height: 100%;
  width: 100%;
`;

export const Slider = styled.input`
  width: 100%;
  position: absolute;
  bottom: 0;
  margin: 0;
  padding: 0;
  height: 3px;
  border-radius: 0;
  border: none;
  cursor: pointer;

  &:hover {
    height: 8px;
  }

  &[type='range'] {
    appearance: none;
  }

  &[type='range']::-webkit-slider-thumb {
    appearance: none;
  }

  &:hover,
  &:focus {
    &[type='range']::-webkit-slider-thumb {
      appearance: none;
      background-color: white;
      height: 12px;
      width: 12px;
      border-radius: 100%;
      z-index: 100;
      cursor: pointer;
    }
  }
`;
