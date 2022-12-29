import Pause from '../svgs/Pause';
import { Backdrop, State } from './Styles';

const StateIndicator = () => {
  return (
    <Backdrop>
      <State>
        <Pause />
      </State>
    </Backdrop>
  );
};

export default StateIndicator;
