import usePrice from '@/lib/use-price';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Image } from '@/components/ui/image';
import { siteSettings } from '@/settings/site';

interface Props {
  item: any;
  notAvailable?: boolean;
}

const ItemCard = ({ item, notAvailable }: Props) => {
  const { t } = useTranslation('common');
  const { price } = usePrice({
    amount: item.itemTotal,
  });
  return (
    <div className="flex justify-between py-2 items-center">
      <div className="flex items-center justify-between text-base">
        <div className="w-8 sm:w-16 h-8 sm:h-16 flex items-center justify-center overflow-hidden bg-gray-100 mr-4 shrink-0 relative">
          <Image
            src={item?.image ?? siteSettings?.product?.placeholderImage}
            alt={item.name}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <span
          className={cn('text-sm', notAvailable ? 'text-red-500' : 'text-body')}
        >
          <span
            className={cn(
              'text-sm font-bold',
              notAvailable ? 'text-red-500' : 'text-heading'
            )}
          >
            {item.quantity}
          </span>
          <span className="mx-2">x</span>
          <span>{item.name}</span> | <span>{item.unit}</span>
        </span>
      </div>
      <span
        className={cn('text-sm', notAvailable ? 'text-red-500' : 'text-body')}
      >
        {!notAvailable ? price : t('text-unavailable')}
      </span>
    </div>
  );
};

export default ItemCard;
