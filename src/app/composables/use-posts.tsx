import { useState } from "react";
import postApi from '../_api/post';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  async function getPosts({ 
    keyword = '', 
    filter = 'dt', 
    isDescending = true, 
    limit = 9 
  }) {
    try {
      setIsLoading(true);
      const data = await postApi.fetchPosts({ 
        offset: 0, 
        keyword, 
        filter, 
        isDescending, 
        limit
      });
      setPosts(data.data);
      setTotalCount(data.count);
    } finally {
      setIsLoading(false);
    }
  }

  async function getMorePosts({ 
    keyword = '', 
    filter = 'dt', 
    isDescending = true, 
    limit = 9 
  }) {
    try {
      setIsMoreLoading(true);
      const data = await postApi.fetchPosts({ 
        offset: posts.length,
        keyword,
        filter,
        isDescending,
        limit
      });
      const newPosts = [...posts, ...data.data];
      setPosts(newPosts);
      console.log(newPosts);
      setTotalCount(data.count);
    } finally {
      setIsMoreLoading(false);
    }
  }



  return {
    totalCount,
    posts,
    getPosts,
    isLoading,
    isMoreLoading,
    getMorePosts,
  };
}