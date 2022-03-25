import BackButton from '@/components/ui/back-button';
import { AddToCartAlt } from '@/components/products/add-to-cart/add-to-cart-alt';
import usePrice from '@/lib/use-price';
import { ThumbsCarousel } from '@/components/ui/thumb-carousel';
import { useTranslation } from 'next-i18next';
import { getVariations } from '@/lib/get-variations';
import { useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import Truncate from '@/components/ui/truncate';
import { scroller, Element } from 'react-scroll';
import CategoryBadges from './category-badges';
import VariationPrice from './variation-price';
import { useRouter } from 'next/router';
import { ROUTES } from '@/lib/routes';
import type { Product } from '@/framework/types';
import { useAtom } from 'jotai';
import VariationGroups from './variation-groups';
import { isVariationSelected } from '@/lib/is-variation-selected';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { Waypoint } from 'react-waypoint';
import { stickyShortDetailsAtom } from '@/store/sticky-short-details-atom';
import { useAttributes } from './attributes.context';
import classNames from 'classnames';
import { displayImage } from '@/lib/display-product-preview-images';
import { Menu, Transition, Dialog } from '@headlessui/react';
import cn from 'classnames';
import { Fragment } from 'react';
import Scrollbar from '@/components/ui/scrollbar';
import { ArrowDownIcon } from '@/components/icons/arrow-down';
import Link from '@/components/ui/link';
import { Image } from '@/components/ui/image';
import { useMediaQuery } from 'react-responsive';
import { hotPlaceholder } from '@/lib/placeholders';

type Props = {
  product: Product;
  backBtn?: boolean;
  isModal?: boolean;
};
const Details: React.FC<Props> = ({
  product,
  backBtn = true,
  isModal = false,
}) => {
  const {
    name,
    image, //could only had image we need to think it also
    description,
    unit,
    categories,
    gallery,
    type,
    quantity,
    shop,
    slug,
  } = product ?? {};
  const { t } = useTranslation('common');
  const [_, setShowStickyShortDetails] = useAtom(stickyShortDetailsAtom);

  const router = useRouter();
  const { closeModal } = useModalAction();

  const { attributes } = useAttributes();

  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price!,
    baseAmount: product?.price,
  });

  const navigate = (path: string) => {
    router.push(path);
    closeModal();
  };

  const variations = useMemo(
    () => getVariations(product?.variations),
    [product?.variations]
  );
  const isSelected = isVariationSelected(variations, attributes);
  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = product?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }

  const scrollDetails = () => {
    scroller.scrollTo('details', {
      smooth: true,
      offset: -80,
    });
  };

  const onWaypointPositionChange = ({
    currentPosition,
  }: Waypoint.CallbackArgs) => {
    if (!currentPosition || currentPosition === 'above') {
      setShowStickyShortDetails(true);
    }
  };
  const hasVariations = !isEmpty(variations);
  const previewImages = displayImage(selectedVariation?.image, gallery, image);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-150 bg-gray-100">
    <div className="px-5 mt-4" style={{ display: 'flex'}}>
        <Menu
          as="div"
          className="relative inline-block ltr:text-left rtl:text-right"
        >
          <Menu.Button
            className={cn(
              'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading xl:px-4 mr-4'
            )}
          >
            {({ open }) => (
              <>
                <span className="whitespace-nowrap text-sm">Spirit & Mixers</span>
                <span className="flex ltr:pl-2.5 rtl:pr-2.5 pt-1 ltr:ml-auto rtl:mr-auto">
                    <ArrowDownIcon
                      className={cn('h-3 w-3', {
                        'transform rotate-180': open,
                      })}
                    />
                </span>
              </>
            )}
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              as="ul"
              className={cn(
                'absolute zindex-100 py-2 w-38 h-56 lg:h-72 2xl:h-auto min-h-40 max-h-56 sm:max-h-72 2xl:max-h-screen bg-light rounded shadow-700 focus:outline-none overflow-hidden'
              )}
              style={{zIndex: '100'}}
            >
              <Scrollbar
                className="w-full h-full"
                options={{
                  scrollbars: {
                    autoHide: 'never',
                  },
                }}
              >
                  <Menu.Item key={1}>
                    {({ active }) => (
                      <Link
                        href='/grocery/search?category=vermouth'
                        className={cn(
                          'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                          active ? 'text-accent' : 'text-body-dark'
                        )}
                      >
                        <span>Vermouth</span>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item key={2}>
                    {({ active }) => (
                      <Link
                        href='/grocery/search?category=whisky'
                        className={cn(
                          'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                          active ? 'text-accent' : 'text-body-dark'
                        )}
                      >
                        <span>Whisky</span>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item key={3}>
                    {({ active }) => (
                      <Link
                        href='/grocery/search?category=vodka'
                        className={cn(
                          'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                          active ? 'text-accent' : 'text-body-dark'
                        )}
                      >
                        <span>Vodka</span>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item key={4}>
                    {({ active }) => (
                      <Link
                        href='grocery/search?category=gin'
                        className={cn(
                          'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                          active ? 'text-accent' : 'text-body-dark'
                        )}
                      >
                        <span>Gin</span>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item key={5}>
                    {({ active }) => (
                      <Link
                        href='grocery/search?category=rum'
                        className={cn(
                          'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                          active ? 'text-accent' : 'text-body-dark'
                        )}
                      >
                        <span>Rum</span>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item key={6}>
                    {({ active }) => (
                      <Link
                        href='grocery/search?category=tequila'
                        className={cn(
                          'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                          active ? 'text-accent' : 'text-body-dark'
                        )}
                      >
                        <span>Tequila</span>
                      </Link>
                    )}
                  </Menu.Item>
              </Scrollbar>
            </Menu.Items>
          </Transition>
        </Menu>
        <Menu
          as="div"
          className="relative inline-block ltr:text-left rtl:text-right"
        >
          <Menu.Button
            className={cn(
              'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading xl:px-4'
            )}
          >
            {({ open }) => (
              <>
                <span className="whitespace-nowrap">Wines</span>
                <span className="flex ltr:pl-2.5 rtl:pr-2.5 pt-1 ltr:ml-auto rtl:mr-auto">
                    <ArrowDownIcon
                      className={cn('h-3 w-3', {
                        'transform rotate-180': open,
                      })}
                    />
                </span>
              </>
            )}
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              as="ul"
              className={cn(
                'absolute zindex-100 py-2 w-48 h-56 lg:h-72 2xl:h-auto min-h-40 max-h-56 sm:max-h-72 2xl:max-h-screen bg-light rounded shadow-700 focus:outline-none overflow-hidden'
              )}
              style={{zIndex: '100'}}
            >
              <Scrollbar
                className="w-full h-full"
                options={{
                  scrollbars: {
                    autoHide: 'never',
                  },
                }}
              >
                  <Menu.Item key={1}>
                    {({ active }) => (
                      <Link
                        href='grocery/search?category=sparkling-wine'
                        className={cn(
                          'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                          active ? 'text-accent' : 'text-body-dark'
                        )}
                      >
                        <span>Sparkling wine</span>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item key={2}>
                    {({ active }) => (
                      <Link
                        href='/red-wine'
                        className={cn(
                          'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                          active ? 'text-accent' : 'text-body-dark'
                        )}
                      >
                        <span>Red wine</span>
                      </Link>
                    )}
                  </Menu.Item>
              </Scrollbar>
            </Menu.Items>
          </Transition>
        </Menu>
        {isDesktopOrLaptop &&
          <Link
            href='/offers'
            className='flex items-center px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none'
          >
            <span>Offers</span>
          </Link>
        }
        {isDesktopOrLaptop &&
          <Link
            href='/'
            className='flex space-x-4 rtl:space-x-reverse items-center px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none'
          >
            <span>About Us</span>
          </Link>
        }
        {isDesktopOrLaptop &&
          <Link
            href='/contact'
            className='flex space-x-4 rtl:space-x-reverse items-center px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none'
          >
            <span>Contact Us</span>
          </Link>
        }
    </div>
      <article className="rounded-lg bg-light">
        <div className="flex flex-col border-b md:flex-row border-border-200 border-opacity-70">
          <div className="p-6 pt-10 md:w-1/2 lg:p-14 xl:p-16">
          <div className="flex items-start">
            {backBtn && <BackButton />}
          </div>
            <div className="flex items-right justify-end mb-8 lg:mb-10">

              {discount && (
                <div className="mt-1">
                  <Image
                    src={hotPlaceholder}
                    alt={name}
                    width={70}
                    height={70}
                    layout="fixed"
                    objectFit="contain"
                  />
                </div>
              )}
            </div>

            <div className="h-full product-gallery">
              <ThumbsCarousel
                gallery={previewImages}
                hideThumbs={previewImages.length <= 1}
              />
            </div>
          </div>

          <div className="flex flex-col items-start p-5 pt-10 md:w-1/2 lg:p-14 xl:p-16">
            <Waypoint
              onLeave={() => setShowStickyShortDetails(true)}
              onEnter={() => setShowStickyShortDetails(false)}
              onPositionChange={onWaypointPositionChange}
            >
              <div className="w-full">
                <h1
                  className={classNames(
                    `font-semibold text-lg md:text-xl xl:text-2xl tracking-tight text-heading`,
                    {
                      'cursor-pointer transition-colors hover:text-accent':
                        isModal,
                    }
                  )}
                  {...(isModal && {
                    onClick: () => navigate(`${ROUTES.PRODUCT}/${slug}`),
                  })}
                >
                  {name}
                </h1>

                {unit && !hasVariations && (
                  <span className="block mt-2 text-sm font-normal text-body md:mt-3">
                    {unit}
                  </span>
                )}

                {description && (
                  <div className="mt-3 text-sm leading-7 md:mt-4 text-body">
                    <Truncate
                      character={150}
                      {...(!isModal && {
                        onClick: () => scrollDetails(),
                        compressText: 'common:text-see-more',
                      })}
                    >
                      {description}
                    </Truncate>
                  </div>
                )}

                {hasVariations ? (
                  <>
                    <div className="flex items-center my-5 md:my-10">
                      <VariationPrice
                        selectedVariation={selectedVariation}
                        minPrice={product.min_price}
                        maxPrice={product.max_price}
                      />
                    </div>
                    <div>
                      <VariationGroups variations={variations} />
                    </div>
                  </>
                ) : (
                  <span className="flex items-center my-5 md:my-10">
                    <ins className="text-2xl font-semibold no-underline md:text-3xl text-accent">
                      {price}
                    </ins>
                    {basePrice && (
                      <del className="text-sm font-normal md:text-base text-muted ltr:ml-2 rtl:mr-2">
                        {basePrice}
                      </del>
                    )}
                  </span>
                )}

                <div className="flex flex-col items-center mt-4 md:mt-6 lg:flex-row">
                  <div className="mb-3 lg:mb-0 w-full lg:max-w-[400px]">
                    <AddToCartAlt
                      data={product}
                      variant="big"
                      variation={selectedVariation}
                      disabled={selectedVariation?.is_disable || !isSelected}
                    />
                  </div>

                  {!hasVariations && (
                    <>
                      {Number(quantity) > 0 ? (
                        <span className="text-base text-body whitespace-nowrap ltr:lg:ml-7 rtl:lg:mr-7">
                          {quantity} {t('text-pieces-available')}
                        </span>
                      ) : (
                        <div className="text-base text-red-500 whitespace-nowrap ltr:lg:ml-7 rtl:lg:mr-7">
                          {t('text-out-stock')}
                        </div>
                      )}
                    </>
                  )}
                  {!isEmpty(selectedVariation) && (
                    <span className="text-base text-body whitespace-nowrap ltr:lg:ml-7 rtl:lg:mr-7">
                      {selectedVariation?.is_disable ||
                      selectedVariation.quantity === 0
                        ? t('text-out-stock')
                        : `${selectedVariation.quantity} ${t(
                            'text-pieces-available'
                          )}`}
                    </span>
                  )}
                </div>
              </div>
            </Waypoint>

            {!!categories?.length && (
              <CategoryBadges
                categories={categories}
                basePath={`/${type?.slug}`}
                onClose={closeModal}
              />
            )}
          </div>
        </div>

        <Element
          name="details"
          className="px-5 py-4 border-b lg:px-16 lg:py-14 border-border-200 border-opacity-70"
        >
          <h2 className="mb-4 text-lg font-semibold tracking-tight text-heading md:mb-6">
            {t('text-details')}
          </h2>
          <p className="text-sm text-body">{description}</p>
        </Element>
      </article>
    </div>
  );
};

export default Details;
