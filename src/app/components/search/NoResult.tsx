import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const Font = styled.p<{fontSize: number}>`
  font-size: ${props => props.fontSize}px;
`;

export default function NoResult() {
  return <Container>
    <Font fontSize={16}>검색 결과가 없습니다.</Font>
  </Container>
}