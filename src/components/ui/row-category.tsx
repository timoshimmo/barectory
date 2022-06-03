import React, { useEffect, useState, Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/lib/locals';
import { ArrowPrevIcon } from '@/components/icons/arrow-prev';
import { ArrowNextIcon } from '@/components/icons/arrow-next';
import { Swiper, SwiperSlide, Navigation, Autoplay, SwiperWrapper } from '@/components/ui/slider';
import { productPlaceholder } from '@/lib/placeholders';
import { Image } from '@/components/ui/image';
import Link from './link';
import CategoryProductsGrid from './category-row-products';
import { ROUTES } from '@/lib/routes';

{/*
href={`${ROUTES.HOME}/search?category=${item.slug}`}
href={`${ROUTES.CATEGORIES}/${item.id}`}
*/}

interface CategoryItemProps {
  item: any;
}
const CategoryItem: React.FC<CategoryItemProps> = ({ item }) => {

  const handleParent = (slug) => {
    //router.push(`${ROUTES.CATEGORIES}/beer`);
     localStorage.setItem("parentCategory", slug);
  }

  return (
    <div className="relative mt-[70px]">
      <Link
          href={`${ROUTES.CATEGORIES}/${item.slug}`}
          onClick={()=>handleParent(item.slug)}
          className="flex space-x-4 items-center py-2.5 w-20 font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none"
          query
          >
        <span className="whitespace-nowrap text-3xl">{item.name}</span>
      </Link>
      <CategoryProductsGrid slug={item.slug}/>
    </div>
  );
};

function CategoryRow({ items }: any) {
  const { t } = useTranslation('common');
  const { isRTL } = useIsRTL();

  return (
    <div className="w-full relative">
      {items?.map((category: any, idx: number) => (
          <CategoryItem item={category} />
      ))}

    </div>
  );
}

export default CategoryRow;
