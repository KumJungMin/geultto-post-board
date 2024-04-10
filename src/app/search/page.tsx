"use client";

import SearchHeader from "../components/SearchHeader";
import Card from "../components/Card";
import { styled } from 'styled-components';


const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  padding: 200px 24px 24px;
`;

const Grid = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 46px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const MOCK_DATA = [
  { title: '제목1제목1제목1제목제목1제목1제목1제목1제목1제목1제목1제????1제목1제목1제목1제????제목1제목1제목1제목1제목1제목1제목1제????????목1', category: ['카테고리1', '카테고리2'], date: '2021-01-01', author: '작성자1', link: '' },
  { title: '제목2', category: ['카테고리1', '카테고리2'], date: '2021-01-01', author: '작성자2', link: '' },
  { title: '제aaaa목333', category: ['카테고리1', '카테고리2', 'aaa'], date: '2021-01-01', author: '작성자3', link: '' },
  { title: '제목4444', category: ['카테고리1', '카테고리2', 'bbbbb'], date: '2021-01-01', author: '작성자4', link: '' },
  { title: '제목555551', category: ['카테고리1', '카테고리2', 'sads', 'aaaaa'], date: '2021-01-01', author: '작성자55555', link: '' },
]


export default function Search() {
  return (
    <Container>
      <SearchHeader />
      <Grid>
        {
          MOCK_DATA.map((data, index) => (
            <Card key={index} data={data} />
          ))
        }
      </Grid>
    </Container>
  );
}
