'use client';

import SearchHeader from './components/SearchHeader';
import { styled } from 'styled-components';

const Container = styled.main`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;


export default function Home() {
  return (
    <Container>
      <SearchHeader />
    </Container>
  );
}
