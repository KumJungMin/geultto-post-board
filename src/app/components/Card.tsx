import { styled } from 'styled-components';

interface CardProps {
  data: {
    title: string;
    author: string;
    category: string[];
    date: string;
  }
}

const Container = styled.div`
  background-color: #fff;
  min-height: 200px;
  padding: 28px 34px;
  border-radius: 38px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: background-color 0.1s;
  &:hover {
    background-color: #f9f9f9;
  }
  &:active {
    background-color: #f1f1f1;
  }
`;

const Title = styled.h3`
  font-size: 22px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 22px;
  height: 44px;
`;

const Font = styled.p<{fontSize: number}>`
  font-size: ${props => props.fontSize}px;
`;

const Content = styled.div`
  display: grid;
  gap: 8px;
`;

// TODO: Label 컴포넌트로 분리하기
const Label = styled.span`
  margin-right: 8px;
  padding: 4px 8px;
  background-color: #f1f1f1;
  border-radius: 8px;
  font-size: 12px;
`;

//TODO: card.Title  card.Content 형식으로 확장되게 수정하기
// const CardComponents = {
//   Title: (props) => {
//     return <Title>{props.children}</Title>
//   },
//   Content: (props) => {
//     return <div>{props.children}</div>
//   }
// }

export default function Card({ data }:CardProps) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Content>
        <Font fontSize={14}>{data.author}</Font>
        <Font fontSize={10}>{data.date}</Font>
        <div>
          {
            data.category.map((category, index) => (
              <Label key={index}>{category}</Label>
            ))
          }
        </div>
      </Content>
    </Container>
  );
}