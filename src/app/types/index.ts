
export type Filter = 'dt' | 'relevance';

export interface Post {
  title: string;
  name: string;
  cohort: string;
  tags: string;
  dt: string;
  content_url: string;
}
