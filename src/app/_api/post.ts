
interface PostParams {
  keyword: string;
  filter?: string;
  isDescending?: boolean;
  limit?: number;
  pageParam?: number;
}

async function fetchPosts ({ 
  pageParam = 0, 
  keyword = '', 
  filter = 'dt', 
  isDescending = true, 
  limit = 9 
}: PostParams
) {
  const baseUrl = 'https://ttobot.kro.kr/v1/contents';
  const response = await fetch(`${baseUrl}?keyword=${keyword}&offset=${pageParam}&limit=${limit}&order_by=${filter}&descending=${isDescending}`);
  return response.json();
};

const postApi = {
  fetchPosts
}

export default postApi;