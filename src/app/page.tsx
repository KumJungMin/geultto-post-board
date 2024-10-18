'use client';

import SearchHeader from './components/common/SearchHeader';
import { styled } from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const Container = styled.main`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const AnimationWrapper = styled.div`
  transition: transform 0.1s;
  transform: translate(calc(var(--x)/80), calc(var(--y)/80));
`;

export default function Home() {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  useEffect(() => {
    window.addEventListener('mousemove', movingAnimation);
    return () => {
      window.removeEventListener('mousemove', movingAnimation);
    }
  });
  
  function movingAnimation(e: MouseEvent) {
    const html = document.documentElement;
    html.style.setProperty('--x', e.clientX + 'px');
    html.style.setProperty('--y', e.clientY + 'px');
  }

  function updateQuery({ keyword }: { keyword: string }) {
    if (!keyword.length) return;

    const params = new URLSearchParams(searchParams);

    params.set('keyword', keyword.trim());
    const newUrl = `/search?${params.toString()}`;
    push(newUrl);
  }

  return (
    <Container>
      <AnimationWrapper>
        <SearchHeader handleSubmit={updateQuery} />
      </AnimationWrapper>
    </Container>
  );
}
