import { useState, useEffect } from 'react';
import ProductLoader from '@/components/ui/loaders/product-loader';
import NotFound from '@/components/ui/not-found';
import rangeMap from '@/lib/range-map';
import ProductCard from '@/components/products/cards/card';
import ErrorMessage from '@/components/ui/error-message';
import { useCategoryProduct } from '@/framework/product';
import SectionBlock from '@/components/ui/section-block';
import { useTranslation } from 'next-i18next';
import { Product } from '@/framework/types';
import classNames from 'classnames';
import { useIsRTL } from '@/lib/locals';
import { ArrowPrevIcon } from '@/components/icons/arrow-prev';
import { ArrowNextIcon } from '@/components/icons/arrow-next';
import { Swiper, SwiperSlide, Navigation, Autoplay } from '@/components/ui/slider';
import Link from '@/components/ui/link';
import cn from 'classnames';
import { ROUTES } from '@/lib/routes';

interface Props {
  slug?: string;
  item?: any;
  limit?: number;
}

export default function CategoryChildProductsGrid({
  slug,
  item,
  limit = 10
}: Props) {
  const { t } = useTranslation('common');

  //const { products, isLoading, error } = usePopularProducts(variables);
  const { products, isLoading, error } = useCategoryProduct({ slug: slug });

  const { isRTL } = useIsRTL();

  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  const breakpoints = {
    320: {
      slidesPerView: 2.5,
      spaceBetween: 13,
    },

    540: {
      slidesPerView: 3,
      spaceBetween: 20,
    },

    820: {
      slidesPerView: 4,
      spaceBetween: 20,
    },

    1200: {
      slidesPerView: 4,
      spaceBetween: 20,
    },

    1280: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1800: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    2600: {
      slidesPerView: 5,
      spaceBetween: 40,
    },
  };


  if (error) return <ErrorMessage message={error.message} />;
  if (!isLoading && !products.length) {
    return null;
  }

  return (
    <div className="w-full">
      <Link
          href={`${ROUTES.HOME}/search?category=${item.slug}`}
          className="flex space-x-4 items-center py-2.5 w-20 font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none"
          >
        <span className="whitespace-nowrap lg:text-2xl text-1xl font-semibold">{item.name}</span>
      </Link>
      <div className="w-full relative mt-5">
        <Swiper
          id="category-card-menu"
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl,
            nextEl,
            disabledClass: 'swiper-button-disabled',
            hiddenClass: 'swiper-button-hidden',
          }}
          breakpoints={breakpoints}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
        >
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 gap-y-10 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:gap-8 xl:gap-y-12 2xl:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
            {isLoading && !products.length
              ? rangeMap(limit, (i) => (
                  <SwiperSlide key={i}>
                    <ProductLoader key={i} uniqueKey={`product-${i}`} />
                  </SwiperSlide>
                ))
              : products.slice(0, 6).map((product, idx: number) => (
                  <SwiperSlide key={idx}>
                    <ProductCard product={product} key={product?.id} />
                  </SwiperSlide>
                ))}
          </div>
        </Swiper>
        <div
          ref={(node) => setPrevEl(node)}
          className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 rounded-full outline-none cursor-pointer banner-slider-prev text-heading bg-light shadow-300 top-1/2 ltr:-left-4 rtl:-right-4 focus:outline-none transition-colors hover:text-orange-500"
        >
          <span className="sr-only">{t('text-previous')}</span>
          {isRTL ? <ArrowNextIcon /> : <ArrowPrevIcon />}
        </div>
        <div
          ref={(node) => setNextEl(node)}
          className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 rounded-full outline-none cursor-pointer banner-slider-next text-heading bg-light shadow-300 top-1/2 ltr:-right-4 rtl:-left-4 focus:outline-none transition-colors hover:text-orange-500"
        >
          <span className="sr-only">{t('text-next')}</span>
          {isRTL ? <ArrowPrevIcon /> : <ArrowNextIcon />}
        </div>
      </div>
    </div>
  );
}
