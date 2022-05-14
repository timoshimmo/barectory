import { useState, useEffect } from 'react';
import { getLayout } from '@/components/layouts/layout';
import { AttributesProvider } from '@/components/categories/subcategories/attributes.context';
import Seo from '@/components/seo/seo';
import { useWindowSize } from '@/lib/use-window-size';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';
export { getStaticPaths, getStaticProps } from '@/framework/category.ssr';
import { useCategory } from '@/framework/category';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
const Subcategories = dynamic(() => import('@/components/categories/subcategories/subcategories'));


export default function SubCategoriesPage({ cat }: any) {
  const { width } = useWindowSize();
  const { t } = useTranslation('common');

  const router = useRouter();
  const query = router.query;

  const { slug } = query;
  const { category, isLoading, error } = useCategory({ slug: slug });

  return (
    <>
      <Seo
        title={cat?.name}
        url={cat?.slug!}
      />
        <div className="min-h-screen bg-light">
          <Subcategories category={cat} loading={isLoading} />
        </div>
    </>
  );
}
SubCategoriesPage.getLayout = getLayout;
