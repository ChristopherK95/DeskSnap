import styled from 'styled-components';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Table = styled.table`
  width: 800px;
  border-spacing: 0;
  border-radius: 5px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
`;

const TitleBar = styled.th({
  background: 'linear-gradient(to bottom,#fa7646,#ff8e38)',
  fontFamily: 'RobotoBold',
  fontSize: '30px',
  height: '60px',
  borderRadius: '5px 5px 0 0',
});

const HeaderRow = styled.tr`
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.3);
  position: relative;
  /* :after {
    content: '';
    width: 100%;
    height: 3px;
    position: absolute;
    bottom: -3px;
    background-color: rgba(0, 0, 0, 0.5);
  } */
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

const List = <T extends object>(props: { title: string; items: T[] }) => {
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <TitleBar colSpan={Object.keys(props.items).length}>
              {props.title}
            </TitleBar>
          </tr>
          <HeaderRow>
            {Object.keys(props.items[0]).map((header, idx) => (
              <Header key={idx}>{header}</Header>
            ))}
          </HeaderRow>
        </thead>
        <tbody>
          {props.items.map((item, idx) => (
            <Row key={idx} index={idx}>
              {Object.values(item).map((v, i) => (
                <Body key={i}>{v}</Body>
              ))}
            </Row>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default List;
