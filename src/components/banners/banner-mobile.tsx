import { Swiper, SwiperSlide, Navigation, Autoplay, Pagination } from '@/components/ui/slider';
import { Image } from '@/components/ui/image';
import { Banner } from '@/framework/types';
import { productPlaceholder } from '@/lib/placeholders';
import { useIsRTL } from '@/lib/locals';
import { ArrowNext, ArrowPrev } from '@/components/icons';
import { useTranslation } from 'next-i18next';

interface BannerProps {
  banners: Banner[] | undefined;
  layout?: string;
}

const BannerShort: React.FC<BannerProps> = ({ banners }) => {
  const { t } = useTranslation('common');
  const { isRTL } = useIsRTL();

  return (
    <div className="relative ">
      <div className="z-1">
        <div className="relative h-[300px] lg:h-[500px]">
          <Swiper
            className="w-full h-full"
            id="banner"
            loop={true}
            modules={[Navigation, Autoplay, Pagination]}
            resizeObserver={true}
            allowTouchMove={true}
            spaceBetween={10}
            slidesPerView={1}
            navigation={{
              nextEl: '.next',
              prevEl: '.prev',
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: true,
              pauseOnMouseEnter: true
            }}
          >
            {banners?.map((banner, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-full max-h-[300px] md:max-h-[500px]">
                  <Image
                    className="w-full h-full"
                    src={banner.image?.original ?? productPlaceholder}
                    alt={banner.title ?? ''}
                    layout="fill"
                    width={1503}
                    height={580}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        {/*
          <div
              className="prev cursor-pointer absolute top-2/4 ltr:left-4 rtl:right-4 ltr:md:left-5 rtl:md:right-5 z-10 -mt-4 md:-mt-5 w-8 h-8 rounded-full bg-light shadow-200 border border-border-200 border-opacity-70 flex items-center justify-center text-heading transition-all duration-200"
              role="button"
            >
              <span className="sr-only">{t('text-previous')}</span>

              {isRTL ? (
                <ArrowNext width={18} height={18} />
              ) : (
                <ArrowPrev width={18} height={18} />
              )}
            </div>
            <div
              className="next cursor-pointer absolute top-2/4 ltr:right-4 rtl:left-4 ltr:md:right-5 rtl:md:left-5 z-10 -mt-4 md:-mt-5 w-8 h-8 rounded-full bg-light shadow-200 border border-border-200 border-opacity-70 flex items-center justify-center text-heading transition-all duration-200"
              role="button"
            >
              <span className="sr-only">{t('text-next')}</span>
              {isRTL ? (
                <ArrowPrev width={18} height={18} />
              ) : (
                <ArrowNext width={18} height={18} />
              )}
            </div>

        */}
        </div>
      </div>
    </div>
  );
};

export default BannerShort;
