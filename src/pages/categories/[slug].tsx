import { getLayout } from '@/components/layouts/layout';
import { AttributesProvider } from '@/components/categories/subcategories/attributes.context';
import Seo from '@/components/seo/seo';
import { useWindowSize } from '@/lib/use-window-size';
import isEmpty from 'lodash/isEmpty';
import dynamic from 'next/dynamic';

const Subcategories = dynamic(() => import('@/components/categories/subcategories/subcategories'));


export default function SubCategoriesPage({ category }: any) {
  const { width } = useWindowSize();

  return (
    <>
      <Seo
        title={category?.name}
        url={category?.id!}
        categories={!isEmpty(category?.children) ? [category.children] : []}
      />
      <AttributesProvider>
        <div className="min-h-screen bg-light">
          <Subcategories category={category} />
        </div>
      </AttributesProvider>
    </>
  );
}
SubCategoriesPage.getLayout = getLayout;
