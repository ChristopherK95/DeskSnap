import ZeroVolume from './icons/ZeroVolume';
import LowVolume from './icons/LowVolume';
import HighVolume from './icons/HighVolume';
import MuteVolume from './icons/MuteVolume';
import { Mute } from './Styles';

const MuteButton = (props: {
  volume: number;
  muted: boolean;
  onClick: () => void;
}): JSX.Element => {
  const pickIcon = () => {
    console.log(props.muted);
    if (props.muted) {
      return <MuteVolume />;
    } else if (props.volume === 0) {
      return <ZeroVolume />;
    } else if (props.volume <= 0.5) {
      return <LowVolume />;
    } else {
      return <HighVolume />;
    }
  };

  return <Mute onClick={props.onClick}>{pickIcon()}</Mute>;
};

export default MuteButton;
