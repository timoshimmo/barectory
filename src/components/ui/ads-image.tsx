import { Image } from '@/components/ui/image';
import cn from 'classnames';
import Link from '@/components/ui/link';
import { adsPlaceholder } from '@/lib/placeholders';
import { advPlaceholder } from '@/lib/placeholders';
import { useSettings } from '@/framework/settings';

const Ads: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const {
    settings: { logo, siteTitle },
  } = useSettings();
  return (
    <div className="flex w-full h-full relative">
      <span className="h-full w-full ml-3 mr-1">
        <Image
          src={adsPlaceholder}
          alt={'Ads Banner'}
          objectFit="cover"
          width={751}
          height={480}
        />
      </span>
      <span className="h-full w-full ml-1 mr-3">
        <Image
          src={advPlaceholder}
          alt={'Ads Banner'}
          objectFit="cover"
          width={750}
          height={480}
        />
      </span>
    </div>
  );
};

export default Ads;
