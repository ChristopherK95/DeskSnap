import styled from 'styled-components';

export const VolumeContainer = styled.div<{ pressed: boolean }>`
  position: absolute;
  top: 15px;
  left: 0px;
  display: ${(p) => (p.pressed ? 'flex' : 'none')};
  gap: 10px;
`;

export const Volume = styled.input<{ value: number }>`
  width: 80px;
  background-color: transparent;
  ::-moz-range-track {
    border-radius: 0px;
    background: ${(p) =>
      `linear-gradient(to right, white 0%, white ${
        p.value * 100
      }%, rgba(255,255,255,0.2) ${
        p.value * 100
      }%, rgba(255,255,255,0.2) 100%)`};
    height: 2px;
  }

  ::-moz-range-thumb {
    border: none;
    border-radius: 100%;
    background-color: white;
    box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.3);
  }
`;

export const Mute = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  cursor: pointer;

  svg {
    fill: white;
    width: 25px;
    height: 25px;
  }
`;
