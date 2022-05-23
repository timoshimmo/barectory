import { Swiper, SwiperSlide, Navigation, Autoplay, Scrollbar } from '@/components/ui/slider';
import { Image } from '@/components/ui/image';
import { Banner } from '@/framework/types';
import cn from 'classnames';
import Link from '@/components/ui/link';
import { adsPlaceholder } from '@/lib/placeholders';
import { advPlaceholder } from '@/lib/placeholders';
import { useIsRTL } from '@/lib/locals';
import { ArrowNext, ArrowPrev } from '@/components/icons';
import { useTranslation } from 'next-i18next';

interface AdsProps {
  ads: any | undefined;
  layout?: string;
}

const AdsShortSecond: React.FC<AdsProps> = ({ ads }) => {
  const { t } = useTranslation('common');
  const { isRTL } = useIsRTL();

  return (
    <div className="relative">
      <div className="z-1">
      <div className="flex w-full h-full relative desktop-layout">
      {ads?.slice(4, 6).map((ad, idx) => (
        <span className="h-full w-full mx-1">
          <Image
            src={ad.original}
            alt={'Ads Banner'}
            objectFit="cover"
            width={751}
            height={480}
          />
        </span>
        ))}
      </div>
        <div className="relative mobile-layout">
        {ads?.slice(6, 8).map((ad, idx) => (
          <span className="h-full w-full mx-1">
            <Image
              src={ad.original}
              alt={'Ads Banner'}
              objectFit="cover"
              width={751}
              height={480}
            />
          </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdsShortSecond;