import { Image } from '@/components/ui/image';
import Link from '@/components/ui/link';
import cn from 'classnames';
import usePrice from '@/lib/use-price';
import { AddToCartAlt } from '@/components/products/add-to-cart/add-to-cart-alt';
import { useTranslation } from 'next-i18next';
import { ROUTES } from '@/lib/routes';
import { Product } from '@/framework/types';
import { productPlaceholder } from '@/lib/placeholders';
import { PlusIcon } from '@/components/icons/plus-icon';
import { hotPlaceholder } from '@/lib/placeholders';

type NeonProps = {
  product: any;
  className?: string;
};

const Neon: React.FC<NeonProps> = ({ product, className }) => {
  const { t } = useTranslation('common');
  // const { name, image, quantity } = product ?? {};
  // const { price, basePrice, discount } = usePrice({
  //   amount: product.sale_price ? product.sale_price : product.price!,
  //   baseAmount: product.price,
  // });

  const { name, image, slug, quantity, min_price, max_price, product_type } =
    product ?? {};
  const { price, basePrice, discount } = usePrice({
    amount: product.sale_price ? product.sale_price : product.price!,
    baseAmount: product.price,
  });
  const { price: minPrice } = usePrice({
    amount: min_price,
  });
  const { price: maxPrice } = usePrice({
    amount: max_price,
  });



{/*

  import { useModalAction } from '@/components/ui/modal/modal.context';

  const { openModal } = useModalAction();

  function handleProductQuickView() {
    return openModal('PRODUCT_DETAILS', product.slug);
  }

  */}
  return (
      <article
        className={cn(
          'product-card cart-type-neon border border-border-200 rounded h-full bg-light overflow-hidden shadow-sm transition-all duration-200 hover:shadow transform hover:-translate-y-0.5',
          className
        )}
      >
        <Link href={`${ROUTES.PRODUCT}/${slug}`}>
          <div
            className="relative flex items-center justify-center w-auto h-48 sm:h-64"
          >
            <span className="sr-only">{t('text-product-image')}</span>
            <Image
              src={image?.original ?? productPlaceholder}
              alt={name}
              layout="fill"
              objectFit="contain"
              className="product-image"
            />
            {discount && (
              <div className="absolute flex w-full justify-between items-start top-3 md:top-1 py-1 font-semibold px-1.5">
                <div className="rounded text-xs leading-6 font-semibold ml-2 mt-2 px-1.5 sm:px-2 md:px-2.5 bg-accent text-light">
                  {discount}
                </div>
                <div className="px-1">
                  <Image
                    src={hotPlaceholder}
                    alt={name}
                    width={45}
                    height={45}
                    layout="fixed"
                    objectFit="contain"
                  />
                </div>
              </div>
            )}
          </div>
        </Link>
        {/* End of product image */}

        <header className="p-3 md:p-6">
          {product_type.toLowerCase() === 'variable' ? (
            <div className="mb-2">
              <span className="text-sm md:text-base text-heading font-semibold">
                {minPrice}
              </span>
              <span> - </span>
              <span className="text-sm md:text-base text-heading font-semibold">
                {maxPrice}
              </span>
            </div>
          ) : (
            <div className="flex items-center mb-2">
              <span className="text-sm md:text-base text-heading font-semibold">
                {price}
              </span>
              {basePrice && (
                <del className="text-xs md:text-sm text-muted ltr:ml-2 rtl:mr-2">
                  {basePrice}
                </del>
              )}
            </div>
          )}
          {/* End of product price */}

          <h3
            className="text-xs md:text-sm text-body truncate mb-4 cursor-pointer"
          >
            {name}
          </h3>
          {/* End of product title */}

          {product_type.toLowerCase() === 'variable' ? (
            <>
              {Number(quantity) > 0 && (
                <button
                  className="group w-full h-7 md:h-9 flex items-center justify-between w-full text-xs transition-colors bg-gray-100 rounded group h-7 md:h-9 md:text-sm text-body-dark hover:bg-gray-200 hover:bg-gray-200 hover:text-body-dark focus:outline-none focus:bg-gray-200 focus:border-gray-200 focus:text-body-dark"
                >
                  <span className="flex-1">{t('text-add')}</span>
                  <span className="w-7 h-7 md:w-9 md:h-9 bg-gray-200 grid place-items-center ltr:rounded-tr rtl:rounded-tl ltr:rounded-br rtl:rounded-bl transition-colors duration-200 group-hover:bg-gray-300 group-focus:bg-gray-300">
                    <PlusIcon className="w-4 h-4 stroke-2" />
                  </span>
                </button>
              )}
            </>
          ) : (
            <>
              {Number(quantity) > 0 && (
                <AddToCartAlt variant="neon" data={product} />
              )}
            </>
          )}

          {Number(quantity) <= 0 && (
            <div className="bg-red-500 rounded text-xs text-center text-light px-2 py-1.5 sm:py-2.5">
              {t('text-out-stock')}
            </div>
          )}
          {/* End of add to cart */}
        </header>
      </article>

  );
};

export default Neon;
