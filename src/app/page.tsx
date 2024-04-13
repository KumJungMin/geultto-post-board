'use client';

import SearchHeader from './components/common/SearchHeader';
import { styled } from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Filter } from './types';

const Container = styled.main`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export default function Home() {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  function updateQuery({ keyword, filter }: { keyword: string, filter: Filter }) {
    const params = new URLSearchParams(searchParams);

    params.set('keyword', keyword);
    params.set('filter', filter);
    const newUrl = `/search?${params.toString()}`;
    push(newUrl);
  }

  return (
    <Container>
      <SearchHeader handleSubmit={updateQuery}/>
    </Container>
  );
}
