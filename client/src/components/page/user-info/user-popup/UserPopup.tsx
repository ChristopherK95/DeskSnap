import Input from '../../../input/Input';
import { Container, Field, Title } from './styles';

interface PopupType {
  title: string;
  label: string;
  value: string;
  extraValue?: string;
  onChange: (value: string) => void;
  extraOnChange?: (value: string) => void;
}

const UserPopup = (props: { popup: PopupType }) => {
  return (
    <Container>
      <Title>{props.popup.title}</Title>
      <Field>
        <Input
          label={props.popup.label}
          value={props.popup.value}
          onChange={(e) => props.popup.onChange(e)}
          type="text"
        />
        {props.popup.extraValue && props.popup.extraOnChange && (
          <Input
            label="Repeat password"
            value={props.popup.extraValue}
            onChange={props.popup.extraOnChange}
            type="text"
          />
        )}
      </Field>
    </Container>
  );
};

export default UserPopup;
