import React from 'react';
import { Volume, VolumeContainer } from './Styles';
import VolumeIcon from './icons/VolumeIcon';

const VolumeControls = (props: {
  volume: number;
  muted: boolean;
  muteButtonClick: () => void;
  changeVolume: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { volume, muted, muteButtonClick, changeVolume } = props;

  return (
    <VolumeContainer>
      <VolumeIcon volume={volume} muted={muted} onClick={muteButtonClick} />
      <Volume
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => changeVolume(e)}
      />
    </VolumeContainer>
  );
};

export default VolumeControls;
