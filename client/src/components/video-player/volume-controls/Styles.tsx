import styled from 'styled-components';

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
