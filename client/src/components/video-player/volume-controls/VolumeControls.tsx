import React, { useState } from 'react';
import { Volume, VolumeContainer } from './Styles';
import VolumeIcon from './icons/VolumeIcon';
import Tooltip from '../../tooltip/Tooltip';

const VolumeControls = (props: {
  volume: number;
  muted: boolean;
  muteButtonClick: () => void;
  changeVolume: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { volume, muted, muteButtonClick, changeVolume } = props;
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

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
        onMouseDown={() => setShowTooltip(true)}
        onMouseUp={() => setShowTooltip(false)}
      />
      <Tooltip
        value={String(`${Math.round(volume * 100)}%`)}
        visible={showTooltip}
        direction="right"
        transparent
      />
    </VolumeContainer>
  );
};

export default VolumeControls;
