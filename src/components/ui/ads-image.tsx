import { Image } from '@/components/ui/image';
import cn from 'classnames';
import Link from '@/components/ui/link';
import { adsPlaceholder } from '@/lib/placeholders';
import { useSettings } from '@/framework/settings';

const Ads: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const {
    settings: { logo, siteTitle },
  } = useSettings();
  return (
      <span className="relative block h-full w-full">
        <Image
          src={adsPlaceholder}
          alt={'Ads Banner'}
          objectFit="cover"
          width={1503}
          height={480}
        />
      </span>
  );
};

export default Ads;
