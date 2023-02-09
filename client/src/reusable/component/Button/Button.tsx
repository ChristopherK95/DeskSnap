import { StyledButton } from './Styles';

const Button = (props: {
  onClick: () => void;
  danger?: boolean;
  children?: React.ReactNode;
  size?: 'small' | 'normal';
}) => {
  return (
    <StyledButton
      onClick={props.onClick}
      danger={props.danger}
      size={props.size ?? 'normal'}
    >
      {props.children ?? 'Confirm'}
    </StyledButton>
  );
};

export default Button;
