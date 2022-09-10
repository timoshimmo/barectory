import type {
  Blogs,
  BlogsQueryOptions,
} from '@/types';
import { useInfiniteQuery, useQuery } from 'react-query';
import client from './client';
import { API_ENDPOINTS } from './client/api-endpoints';

export const useBlogs = (
  options?: Partial<BlogsQueryOptions>
) => {
  const { data, isLoading, error } = useQuery<Blogs[], Error>(
    [API_ENDPOINTS.BLOGS, options],
    ({ queryKey }) =>
      client.blogs.all(queryKey[1] as BlogsQueryOptions)
  );

  return {
    blogs: data ?? [],
    isLoading,
    error,
  };
};

export function useBlog({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery<Blogs, Error>(
    [API_ENDPOINTS.BLOGS, id],
    () => client.blogs.get(id)
  );
  return {
    blog: data,
    isLoading,
    error,
  };
};
