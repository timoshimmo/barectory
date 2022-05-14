import type { Category } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import invariant from 'tiny-invariant';
import client from './client';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@/framework/client/api-endpoints';
import { QueryClient } from 'react-query';

// This function gets called at build time
type ParsedQueryParams = {
  id: string;
};
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async ({
  locales,
}) => {
  invariant(locales, 'locales is not defined');
  const { data } = await client.categories.all({ limit: 100 });
//  const paths = data?.flatMap((category) =>
//   locales.map((locale) => ({ params: { slug: category.id }, locale }))
//  );

  const paths = data.map(category => ({ params: { slug: category.id.toString() }}));
  console.log(paths);
  //paths.then(data => console.log(data))
  //const paths = ["/categories/1", "/categories/2", "/categories/3", "/categories/4", "/categories/5"]

  return {
    paths,
    fallback: 'blocking',
  };
};
type PageProps = {
  category: Category;
};
export const getStaticProps: GetStaticProps<
  PageProps,
  ParsedQueryParams
> = async ({ params, locale }) => {
  const { slug } = params!; //* we know it's required because of getStaticPaths

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.SETTINGS],
    client.settings.all
  );

  try {
    const cat = await client.categories.get(slug);
    return {
      props: {
        cat,
        ...(await serverSideTranslations(locale!, ['common'])),
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
