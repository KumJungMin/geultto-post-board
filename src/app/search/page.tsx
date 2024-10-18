"use client";

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';
import { useSearchParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';

import type { Filter, JobCategory } from '../types';
import { usePosts } from '../composables/use-posts';
import { jobCategories } from '../constants';

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
  overflow-y: hidden;
`;

const Grid = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 46px auto 0;
  padding: 0 24px 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  @media (max-width: 734px) {
    margin-top: 98px;
  }
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
  const currJobCategory = useRef<JobCategory>('');
  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  const { totalCount, posts, getPosts, getMorePosts, isLoading } = usePosts();

  useEffect(() => {
    const keyword: string = searchParams.get('keyword') || '';
    const filter = searchParams.get('filter') as Filter || 'dt';
    const jobCategory = searchParams.get('job_category') as JobCategory || '';

    if (keyword) currKeyword.current = keyword;
    if (filter) currFilter.current = filter;
    if (jobCategory) currJobCategory.current = jobCategory;

    fetchPosts({ keyword, filter, jobCategory });
  }, []);
  useEffect(() => {
    currPostLength.current = posts.length;
  }, [posts]);

  async function fetchPosts({keyword, filter, jobCategory }: { keyword: string, filter: Filter, jobCategory?: JobCategory }) {
    const CONTENT_LIMIT = 18;
    const limit = Math.min(Math.ceil(window.innerHeight / 1270) * CONTENT_LIMIT, 50);
    getPosts({ keyword, filter, jobCategory, limit });
  }

  function onSubmit({ keyword, filter, selectedItem }: { keyword: string, filter: Filter, selectedItem: JobCategory }) {
    if (!keyword.length) return;

    currKeyword.current = keyword.trim();
    currFilter.current = filter;
    currJobCategory.current = selectedItem;

    fetchPosts({ keyword, filter, jobCategory: selectedItem });

    const params = new URLSearchParams(searchParams as any);

    params.set('keyword', keyword);
    params.set('filter', filter);
    if (selectedItem) params.set('job_category', selectedItem);

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
    const scrollTarget = document.querySelector('.infinite-scroll-component') as HTMLElement;
    const isScrollable = scrollTarget?.offsetHeight + BLANK_AREA < scrollTarget?.scrollHeight;
    
    if (!isScrollable) fetchMorePosts();
    
  }

  function toScrollTop() {
    const scrollTarget = document.querySelector('.infinite-scroll-component');

    scrollTarget?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function onScroll(e: MouseEvent) {
    const scrollTarget = e.target as HTMLElement;
    setScrollTopVisible(scrollTarget.scrollTop > 100);
  }

  let timer: NodeJS.Timeout | null = null;

  function fetchMorePosts() {
    if (currPostLength.current >= totalCount.current) return;

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      getMorePosts({ 
        keyword: currKeyword.current, 
        filter: currFilter.current, 
        offset: currPostLength.current,
        jobCategory: currJobCategory.current
      });
    }, 100);
  }

  return (
    <>
        <Container>
          <InfiniteScroll
            dataLength={posts.length || 0}
            next={ fetchMorePosts }
            height={'100vh'}
            hasMore={ posts.length < totalCount.current }
            onScroll={onScroll}
            loader={<Loading style={{ marginTop: '20px' }} />}
            endMessage={ posts.length ? <EndMessage>더 이상의 컨텐츠가 없습니다</EndMessage> : ''}
            refreshFunction={() => fetchPosts({ keyword: currKeyword.current, filter: currFilter.current, jobCategory: currJobCategory.current })}
          >
          <SearchHeader 
            currKeyword={currKeyword.current} 
            currFilter={currFilter.current} 
            dropdownItems={jobCategories}
            selectedDropdownItem={currJobCategory.current}
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
