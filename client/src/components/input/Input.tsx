import { CSSProperties } from 'styled-components';
import { Container, Label, Value } from './Styles';

const Input = (props: {
  label: string;
  value: string;
  style?: CSSProperties;
  type: React.HTMLInputTypeAttribute;
  onChange: (value: string) => void;
  onKeyEnter?: () => void;
}) => {
  return (
    <Container style={props.style}>
      <Value
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && props.onKeyEnter?.()}
      />
      <Label empty={props.value === ''}>{props.label}</Label>
    </Container>
  );
};

export default Input;
