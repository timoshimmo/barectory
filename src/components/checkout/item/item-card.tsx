import usePrice from '@/lib/use-price';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Image } from '@/components/ui/image';
import { siteSettings } from '@/settings/site';
import { CloseIcon } from '@/components/icons/close-icon';
import { useCart } from '@/store/quick-cart/cart.context';
import Counter from '@/components/ui/counter';

interface Props {
  item: any;
  notAvailable?: boolean;
}

const ItemCard = ({ item, notAvailable }: Props) => {
  const { t } = useTranslation('common');
  const { price } = usePrice({
    amount: item.itemTotal,
  });
  const { isInStock, clearItemFromCart, addItemToCart, removeItemFromCart } =
    useCart();

    function handleIncrement(e: any) {
      e.stopPropagation();
      addItemToCart(item, 1);
    }
    const handleRemoveClick = (e: any) => {
      e.stopPropagation();
      removeItemFromCart(item.id);
    };
    const outOfStock = !isInStock(item.id);
  return (
    <div className="pt-1 pb-2">
      <div className="flex justify-end mb-1">
        <button
          className="w-7 h-7 ltr:ml-3 rtl:mr-3 ltr:-mr-2 rtl:-ml-2 flex items-center justify-center shrink-0 rounded-full text-muted transition-all duration-200 focus:outline-none hover:bg-gray-100 focus:bg-gray-100 hover:text-red-600 focus:text-red-600"
          onClick={() => clearItemFromCart(item.id)}
        >
          <span className="sr-only">{t('text-close')}</span>
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="flex justify-between items-center">
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
      <div className="flex-shrink-0">
        <Counter
          value={item.quantity}
          onDecrement={handleRemoveClick}
          onIncrement={handleIncrement}
          variant="pillHorizontal"
          disabled={outOfStock}
        />
      </div>
    </div>
  );
};

export default ItemCard;
