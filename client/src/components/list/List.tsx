import styled from 'styled-components';
import useColor from '../../reusable/hooks/useColor';

const Container = styled.div`
  display: 'flex';
  flex-direction: 'column';
`;

const Table = styled.table`
  width: 800px;
  border-spacing: 0;
  border-radius: 5px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
`;

const TitleBar = styled.th`
  background: linear-gradient(
    to bottom,
    ${() => useColor('orange')},
    ${() => useColor('lightOrange')}
  );
  font-family: RobotoBold;
  font-size: 30px;
  height: 60px;
  border-radius: 5px 5px 0 0;
`;

const HeaderRow = styled.tr`
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const Header = styled.th`
  background-color: #292727;
  font-size: 22px;
  padding: 5px 10px;
  text-align: start;
`;

const Row = styled.tr<{ index: number }>`
  background-color: ${(p) => (p.index % 2 === 1 ? '#252222' : '#424242')};
`;

const Body = styled.td`
  text-align: start;
  font-size: 20px;
  padding: 10px 0 10px 15px;
  height: 50px;
`;

const List = <T extends object>(props: {
  title: string;
  items: T[];
  button?: React.ReactNode;
}) => {
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <TitleBar
              colSpan={
                props.button
                  ? Object.keys(props.items).length + 1
                  : Object.keys(props.items).length
              }
            >
              {props.title}
            </TitleBar>
          </tr>
          <HeaderRow>
            {Object.keys(props.items[0]).map((header, idx) => (
              <Header key={idx}>{header}</Header>
            ))}
            {props.button && <Header style={{ width: '100px' }} />}
          </HeaderRow>
        </thead>
        <tbody>
          {props.items.map((item, idx) => (
            <Row key={idx} index={idx}>
              {Object.values(item).map((v, i) => (
                <Body key={i}>{v}</Body>
              ))}
              {props.button && <Body>{props.button}</Body>}
            </Row>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default List;
