import { useState, useEffect } from 'react';
import ErrorMessage from '@/components/ui/error-message';
import dynamic from 'next/dynamic';
import { useAllCategories } from '@/framework/category';

const CategoriesRow = dynamic(
  () => import('@/components/categories/categories-row')
);

interface CategoriesHomeProps {
  variables: any;
  className?: string;
}
export default function CategoriesHome() {
  const { categories, isLoading, error } = useAllCategories();

  if (error) return <ErrorMessage message={error.message} />;
  //const Component = MAP_CATEGORY_TO_GROUP[layout];

  return (
    <CategoriesRow
      notFound={!Boolean(categories.length)}
      categories={categories}
      loading={isLoading}
    />
  );
}
