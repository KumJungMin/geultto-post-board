import { useState, useRef } from "react";
import postApi from '../_api/post';
import type { Post } from '../types';

export function usePosts() {
  const totalCount = useRef(0);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  async function getPosts({ 
    keyword = '', 
    filter = 'dt', 
    jobCategory = '',
    isDescending = true, 
    limit = 18 
  }) {
    try {
      setIsLoading(true);
      setPosts([]);
      const data = await postApi.fetchPosts({ 
        offset: 0, 
        keyword, 
        filter, 
        isDescending, 
        limit,
        job_category: jobCategory
      });
      setPosts(data.data);
      totalCount.current = data.count;
    } finally {
      setIsLoading(false);
    }
  }

  async function getMorePosts({ 
    keyword = '', 
    filter = 'dt', 
    isDescending = true, 
    limit = 18,
    offset = posts.length,
    jobCategory = '',
  }) {
    try {
      setIsMoreLoading(true);
      const data = await postApi.fetchPosts({ 
        offset,
        keyword,
        filter,
        isDescending,
        limit,
        job_category: jobCategory
      });
      setPosts(prevPosts => [...prevPosts, ...data.data])
      totalCount.current = data.count;
    } finally {
      setIsMoreLoading(false);
    }
  }

  return { totalCount, posts, getPosts, getMorePosts, isLoading, isMoreLoading };
}