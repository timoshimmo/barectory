import ErrorMessage from '@/components/ui/error-message';
import dynamic from 'next/dynamic';
import { useCategories } from '@/framework/category';

const CategoriesRow = dynamic(
  () => import('@/components/categories/categories-row')
);

interface CategoriesHomeProps {
  variables: any;
  className?: string;
}
export default function CategoriesHome({
  className,
  variables,
}: CategoriesHomeProps) {
  const { categories, isLoading, error } = useCategories(variables);

  if (error) return <ErrorMessage message={error.message} />;
  //const Component = MAP_CATEGORY_TO_GROUP[layout];
  return (
    <CategoriesRow
      notFound={!Boolean(categories.length)}
      categories={categories}
      loading={isLoading}
      className={className}
      variables={variables}
    />
  );
}
