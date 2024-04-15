"use client";

import { useEffect, useState } from 'react';
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
import FullToRefresh from '../components/ui/FullToRefresh';
import NoResult from '../components/search/NoResult';


const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  padding: 200px 24px 24px;
  @media (max-width: 534px) {
    padding-top: 120px;
  }
`;

const Grid = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 46px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const EndMessage = styled.p`
  text-align: center;
  color : #9FA0A1;
`;


export default function Search() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const [currKeyword, setCurrKeyword] = useState('');
  const [currFilter, setCurrFilter] = useState<Filter>('dt');
  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  const { totalCount, posts, getPosts, getMorePosts, isLoading } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const params = new URLSearchParams(searchParams);
    const keyword: string = params.get('keyword') || '';
    const filter = params.get('filter') as Filter || 'dt';

    if (keyword) setCurrKeyword(keyword);
    if (filter) setCurrFilter(filter);

    getPosts({ keyword, filter });
  }

  function onSubmit({ keyword, filter }: { keyword: string, filter: Filter }) {
    setCurrKeyword(keyword);
    setCurrFilter(filter);
    getPosts({ keyword, filter });

    const params = new URLSearchParams(searchParams);

    params.set('keyword', keyword);
    params.set('filter', filter);

    const newUrl = `/search?${params.toString()}`;
    replace(newUrl);
  }

  function toScrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function onScroll() {
    setScrollTopVisible(window.scrollY > 300);
  }

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length || 0}
        next={ () => getMorePosts({ keyword: currKeyword, filter: currFilter }) }
        hasMore={ posts.length < totalCount }
        loader={<Loading />}
        endMessage={ <EndMessage>더 이상의 컨텐츠가 없습니다</EndMessage> }
        onScroll={onScroll}
        refreshFunction={fetchPosts}
        style={{ overflow: 'hidden' }}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        releaseToRefreshContent={ <FullToRefresh /> }
      >
        <Container>
          <SearchHeader currKeyword={currKeyword} currFilter={currFilter} handleSubmit={onSubmit}/>
            {
              isLoading ? <Loading fullWindow /> :
                !posts.length ? 
                  <NoResult /> :
                  <Grid> {posts.map((post, index) => <Card key={index} data={post} />)} </Grid>
              }
        </Container>
      </InfiniteScroll>
      { scrollTopVisible && <ScrollToTop onClick={ toScrollTop } /> }
    </>
  );
}
