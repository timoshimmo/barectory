import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/lib/locals';
import { ArrowPrevIcon } from '@/components/icons/arrow-prev';
import { ArrowNextIcon } from '@/components/icons/arrow-next';
import { Swiper, SwiperSlide, Navigation, Autoplay, SwiperWrapper } from '@/components/ui/slider';
import { productPlaceholder } from '@/lib/placeholders';
import { Image } from '@/components/ui/image';
import Link from './link';
import { ROUTES } from '@/lib/routes';

interface CategoryItemProps {
  item: any;
}
const CategoryItem: React.FC<CategoryItemProps> = ({ item }) => {
  return (
    <div className="relative overflow-hidden text-center cursor-pointer group">
      <Link href={`${ROUTES.CATEGORIES}/${item.slug}`}>
        <img
          src={item?.image?.original! ?? productPlaceholder}
          alt={item?.name!}
          width={150}
          height={150}
          layout="responsive"
          className="rounded-md transition duration-200 transform hover:scale-125 "
          style={{ margin: '0 auto' }}
        />
      </Link>
      <span className="block mt-5 text-base font-bold font-md transition-colors text-heading group-hover:text-orange-500 ltr:text-center rtl:text-center text-uppercase">
        {item.name.toUpperCase()}
      </span>
    </div>
  );
};

function SolidCardCategory({ items }: any) {
  const { t } = useTranslation('common');
  const { isRTL } = useIsRTL();

  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  const styleSlider = {
      justifyContent: 'center !important',
  };

  const breakpoints = {
    320: {
      slidesPerView: 3.5,
      spaceBetween: 15,
    },

    540: {
      slidesPerView: 3,
      spaceBetween: 25,
    },

    820: {
      slidesPerView: 5,
      spaceBetween: 40,
    },

    1200: {
      slidesPerView: 5,
      spaceBetween: 50,
    },

    1280: {
      slidesPerView: 5,
      spaceBetween: 70,
    },
    1800: {
      slidesPerView: 5,
      spaceBetween: 70,
    },
    2600: {
      slidesPerView: 5,
      spaceBetween: 70,
    },
  };

  return (
    <div className="relative swiper-category">
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
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        cssMode={true}
      >
        <SwiperWrapper style={{ justifyContent: 'center' }}>
          {items?.slice(0, 5).map((category: any, idx: number) => (
            <SwiperSlide key={idx}>
              <CategoryItem item={category} />
            </SwiperSlide>
          ))}
        </SwiperWrapper>
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
  );
}

export default SolidCardCategory;
