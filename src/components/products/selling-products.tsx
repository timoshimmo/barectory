import { useState } from 'react';
import ProductLoader from '@/components/ui/loaders/product-loader';
import NotFound from '@/components/ui/not-found';
import rangeMap from '@/lib/range-map';
import ProductSalesCard from '@/components/products/cards/sales-card';
import ErrorMessage from '@/components/ui/error-message';
import { useProducts } from '@/framework/product';
import SectionBlock from '@/components/ui/section-block';
import { useTranslation } from 'next-i18next';
import { Image } from '@/components/ui/image';
import { siteSettings } from '@/settings/site';
import { productPlaceholder } from '@/lib/placeholders';
import Link from '@/components/ui/link';
import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useIsRTL } from '@/lib/locals';
import { ArrowPrevIcon } from '@/components/icons/arrow-prev';
import { ArrowNextIcon } from '@/components/icons/arrow-next';
import { Swiper, SwiperSlide, Navigation } from '@/components/ui/slider';

interface Props {
  className?: string;
  limit?: number;
}

export default function SellingProductsGrid({ className, limit = 6 }: Props) {
  const { t } = useTranslation('common');
  const { products, isLoading, error } = useProducts({ range: 8 });
  const router = useRouter();

  if (error) return <ErrorMessage message={error.message} />;

  const { isRTL } = useIsRTL();

  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    540: {
      slidesPerView: 3,
      spaceBetween: 20,
    },

    820: {
      slidesPerView: 5,
      spaceBetween: 20,
    },

    1200: {
      slidesPerView: 5,
      spaceBetween: 20,
    },

    1280: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
    1800: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    2600: {
      slidesPerView: 6,
      spaceBetween: 40,
    },
  };

  if (!isLoading && !products.length) {
    return (
      <SectionBlock title={t('Hot Deals')}>
        <NotFound text="text-not-found" className="w-7/12 mx-auto" />
      </SectionBlock>
    );
  }


  return (
    <SectionBlock title={t('Hot Deals')}>
      <div className={classNames(className, 'w-full relative')}>

        <Swiper
          id="category-card-menu"
          modules={[Navigation]}
          navigation={{
            prevEl,
            nextEl,
            disabledClass: 'swiper-button-disabled',
            hiddenClass: 'swiper-button-hidden',
          }}
          breakpoints={breakpoints}
          slidesPerView={5}
        >
        <div className="col-span-3 grid gap-6 xl:gap-8 grid-cols-[repeat(auto-fill,minmax(260px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] 2xl:grid-cols-3 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
          {isLoading && !products.length
            ? rangeMap(limit, (i) => (
                <SwiperSlide key={i}>
                  <ProductLoader key={i} uniqueKey={`product-${i}`} />
                </SwiperSlide>
              ))
            : products.slice(6, 13).map((product, idx: number) => (
                <SwiperSlide key={idx}>
                  <ProductSalesCard product={product} key={product.id} />
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
    </SectionBlock>
  );
}
