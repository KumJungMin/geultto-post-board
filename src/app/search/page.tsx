"use client";

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';
import { useSearchParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';

import type { Filter } from '../types';
import { usePosts } from '../composables/use-posts';

import Card from "../components/search/Card";
import Loading from "../components/ui/Loading";
import SearchHeader from "../components/common/SearchHeader";
import ScrollToTop from '../components/ui/ScrollToTop';
import NoResult from '../components/search/NoResult';


const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  padding-top: 100px;
  overflow-y: auto;
  @media (max-width: 534px) {
    padding-top: 80px;
  }
`;

const Grid = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 46px auto 0;
  padding: 0 24px 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const EndMessage = styled.p`
  text-align: center;
  color : #9FA0A1;
`;

export default function Search() {
  const scrollEl = useRef<HTMLDivElement>(null);
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  /** useRef는 컴포넌트가 리렌더링되어도 값이 초기화되지 않는다. 대신 값 변경이 즉시 반영된다. */ 
  const currPostLength = useRef(0);
  const currKeyword = useRef('');
  const currFilter = useRef<Filter>('dt');
  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  const { totalCount, posts, getPosts, getMorePosts, isLoading } = usePosts();

  useEffect(() => {
    const keyword: string = searchParams.get('keyword') || '';
    const filter = searchParams.get('filter') as Filter || 'dt';

    if (keyword) currKeyword.current = keyword;
    if (filter) currFilter.current = filter;
    fetchPosts({ keyword, filter });
  }, []);
  useEffect(() => {
    currPostLength.current = posts.length;
  }, [posts]);

  async function fetchPosts({keyword, filter}: { keyword: string, filter: Filter }) {
    const CONTENT_LIMIT = 18;
    const limit = Math.min(Math.ceil(window.innerHeight / 1270) * CONTENT_LIMIT, 50);
    getPosts({ keyword, filter, limit });
  }

  function onSubmit({ keyword, filter }: { keyword: string, filter: Filter }) {
    if (!keyword.length) return;

    currKeyword.current = keyword.trim();
    currFilter.current = filter;
    fetchPosts({ keyword, filter });

    const params = new URLSearchParams(searchParams);

    params.set('keyword', keyword);
    params.set('filter', filter);

    const newUrl = `/search?${params.toString()}`;
    replace(newUrl);
  }


  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, []);

  function onResize() {
    const BLANK_AREA = 40;
    const isScrollable = scrollEl!.current!.offsetHeight + BLANK_AREA < scrollEl!.current!.scrollHeight;
    if (!isScrollable) fetchMorePosts();
    
  }

  function toScrollTop() {
    scrollEl!.current!.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function onScroll(e: React.UIEvent<HTMLDivElement>){
    setScrollTopVisible(e.currentTarget.scrollTop > 100);
  }

  let timer: NodeJS.Timeout | null = null;

  function fetchMorePosts() {
    if (currPostLength.current >= totalCount.current) return;

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      getMorePosts({ 
        keyword: currKeyword.current, 
        filter: currFilter.current, 
        offset: currPostLength.current 
      });
    }, 100);
  }

  return (
    <>
        <Container ref={scrollEl} id="scrollableDiv" onScroll={onScroll}>
          <InfiniteScroll
            dataLength={posts.length || 0}
            next={ fetchMorePosts }
            hasMore={ posts.length < totalCount.current }
            loader={<Loading style={{ marginTop: '20px' }} />}
            endMessage={ posts.length ? <EndMessage>더 이상의 컨텐츠가 없습니다</EndMessage> : ''}
            refreshFunction={() => fetchPosts({ keyword: currKeyword.current, filter: currFilter.current }) }
            scrollableTarget="scrollableDiv"
          >
          <SearchHeader 
            currKeyword={currKeyword.current} 
            currFilter={currFilter.current} 
            style={{ paddingTop: '84px'}} 
            hasFilter
            handleSubmit={onSubmit}
            onFilterChange={onSubmit}
          />
            {
              isLoading ? <Loading fullWindow /> :
                !posts.length ? 
                  <NoResult /> :
                  <Grid> {posts.map((post, index) => <Card key={index} data={post} />)} </Grid>
              }
          </InfiniteScroll>
        </Container>
      { scrollTopVisible && <ScrollToTop onClick={ toScrollTop } /> }
    </>
  );
}
