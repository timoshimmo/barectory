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
import StickyBox from 'react-sticky-box';
import SidebarFilter from '@/components/search-view/sidebar-filter';


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
        <div className="min-h-screen w-full main-container bg-light">
          <div className="mx-auto flex min-h-screen w-full max-w-1920 px-5 py-10 rtl:space-x-reverse lg:space-x-10 xl:py-14 xl:px-16">
            <div className="hidden shrink-0 lg:block" style={{ width: '20%' }}>
              <StickyBox offsetTop={140} offsetBottom={30}>
                <SidebarFilter />
              </StickyBox>
            </div>
            <Subcategories category={cat} loading={isLoading} />
          </div>
        </div>
    </>
  );
}
SubCategoriesPage.getLayout = getLayout;
