import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/lib/locals';
import { ArrowPrevIcon } from '@/components/icons/arrow-prev';
import { ArrowNextIcon } from '@/components/icons/arrow-next';
import { Swiper, SwiperSlide, Navigation, Autoplay, SwiperWrapper } from '@/components/ui/slider';
import { productPlaceholder } from '@/lib/placeholders';
import { Image } from '@/components/ui/image';
import Link from './link';
import CategoryChildProductsGrid from './category-children-row-products';

interface CategoryItemProps {
  item: any;
}
const CategoryItem: React.FC<CategoryItemProps> = ({ item }) => {

  return (
    <div className="relative mt-[40px]">
      <CategoryChildProductsGrid slug={item.slug} item={item}/>
    </div>
  );
};

function CategoryChildren({ items }: any) {
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

export default CategoryChildren;
