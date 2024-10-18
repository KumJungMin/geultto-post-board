import type { JobCategory } from '../types/index';
interface PostParams {
  keyword: string;
  filter?: string;
  isDescending?: boolean;
  limit?: number;
  offset?: number;
  job_category?: JobCategory | '';
}

async function fetchPosts ({ 
  offset = 0, 
  keyword = '', 
  filter = 'dt', 
  job_category = '',
  isDescending = true, 
  limit = 18 
}: PostParams
) {
    const baseUrl = 'https://ttobot.kro.kr/v1/contents';
    let requestUrl = `${baseUrl}?keyword=${keyword}&offset=${offset}&limit=${limit}&order_by=${filter}&descending=${isDescending}`;
    if (job_category) requestUrl += `&job_category=${job_category}`;
    
    const response = await fetch(requestUrl);
    return response.json();
};

const postApi = {
  fetchPosts
}

export default postApi;