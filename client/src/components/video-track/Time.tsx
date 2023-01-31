import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  font-family: RobotoMedium;
`;

const Time = (props: { timeElapsed: string; duration: string }) => {
  return (
    <Container>
      {props.timeElapsed} / {props.duration}
    </Container>
  );
};

export default Time;
