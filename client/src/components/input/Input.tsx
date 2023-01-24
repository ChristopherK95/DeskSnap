import { CSSProperties } from 'styled-components';
import { Container, Label, Value } from './Styles';

const Input = (props: {
  label: string;
  value: string;
  style?: CSSProperties;
  onChange: (value: string) => void;
}) => {
  return (
    <Container style={props.style}>
      <Value
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
      <Label empty={props.value === ''}>{props.label}</Label>
    </Container>
  );
};

export default Input;
