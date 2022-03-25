import { Image } from '@/components/ui/image';
import cn from 'classnames';
import { hotPlaceholder } from '@/lib/placeholders';
import { useSettings } from '@/framework/settings';

const Hot: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  return (
      <span className="relative h-10 w-32 overflow-hidden md:w-40">
        <Image
          src={hotPlaceholder}
          alt={'Hot Deals'}
          layout="fill"
          objectFit="contain"
          loading="eager"
        />
      </span>
  );
};

export default Hot;
