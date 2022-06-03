import { useState, useEffect } from 'react';
import ErrorMessage from '@/components/ui/error-message';
import dynamic from 'next/dynamic';
import { useCategory } from '@/framework/category';
const Subcategories = dynamic(() => import('@/components/categories/subcategories/subcategories'));

interface CategorySearchProps {
  slug?: string;
}
export default function CategorySearch({
  slug
}: CategorySearchProps) {

  const { category, iscLoading, cerror } = useCategory({ slug: slug });

  if (cerror) return <ErrorMessage message={cerror.message} />;

  return (
    <Subcategories category={category} loading={iscLoading} />
  );
}
