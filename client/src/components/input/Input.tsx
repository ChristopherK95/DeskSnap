import { Container, Label, Value } from './Styles';

const Input = (props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Container>
      <Value
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
      <Label empty={props.value === ''}>{props.label}</Label>
    </Container>
  );
};

export default Input;
