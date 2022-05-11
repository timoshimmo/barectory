import { useState, useEffect } from 'react';
import Head from 'next/head';
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
import { hotPlaceholder } from '@/lib/placeholders';
import { Can } from '@/components/icons/can';
import { Bottle } from '@/components/icons/bottle';

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
    image, 
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
  const [cityStatus, setCityStatus] = useState('');
  const [currentVariation, setCurrentVariation] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCityStatus(window.localStorage.getItem("cityStatus"));
      console.log(cityStatus);
    }
    const obj = { cans: variations.cans };
    console.log(JSON.stringify(variations));
    console.log(JSON.stringify(variations.cans));
    setCurrentVariation(obj);
  },[cityStatus]);

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

  const handleBottles = () => {
    const obj = { bottles: variations.bottles };
    setCurrentVariation(obj);
  };

  const handleCans = () => {
    const obj = { cans: variations.cans };
    setCurrentVariation(obj);
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

  return (
    <div className="main-container flex flex-col min-h-screen transition-colors duration-150 bg-gray-100">
      <Head>
       <title>Barectory</title>
     </Head>
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
              {cityStatus !== "FOUND" &&
                <h1 className="block mt-2 text-md font-normal text-body md:mt-3 font-bold text-heading" style={{ color: 'red', fontWeight: 800, textTransform: 'uppercase' }}>Delivery is currently not available in your city. Click on the change location button in the top menu to update your city.</h1>}
                <h1
                  className="font-semibold text-lg md:text-xl xl:text-2xl tracking-tight text-heading my-4"
                >
                  {name}
                </h1>
                <div className="flex">
                  <div className="flex items-center justify-center flex-col mr-5 ">
                    <div
                        role="button"
                        className={cn(
                          'h-17 w-17 p-2 flex items-center justify-center border-2 rounded-full border-accent bg-accent cursor-pointer'
                        )}
                        onClick={handleCans}
                      >
                        <Can className="w-10 h-10 text-light" />
                      </div>
                      <span className="flex items-center my-2 text-sm font-semibold">
                        CAN
                      </span>
                    </div>
                    <div className="flex items-center justify-center flex-col">
                      <div
                        role="button"
                        className={cn(
                          'h-17 w-17 p-2 flex items-center justify-center border-2 rounded-full border-accent bg-accent cursor-pointer'
                        )}
                        onClick={handleBottles}
                        >
                        <Bottle className="w-10 h-10 text-light" />
                      </div>
                      <span className="flex items-center my-2 text-sm font-semibold">
                        BOTTLE
                      </span>
                    </div>
                  </div>

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
                        <VariationGroups variations={currentVariation} />
                      </div>
                      <span className="block mt-6 text-xs font-semibold text-body md:mt-6" style={{ color: 'red' }}>
                        Please pick a size before adding to cart
                      </span>
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

                <div className="flex flex-col items-center mt-2 md:mt-3 lg:flex-row">
                  <div className="mb-3 lg:mb-0 w-full lg:max-w-[400px]">
                    <AddToCartAlt
                      data={product}
                      variant="big"
                      variation={selectedVariation}
                      disabled={selectedVariation?.is_disable || !isSelected || cityStatus !== "FOUND"}
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
          {cityStatus !== "FOUND" ?
            (<h6 style={{ color: 'red' }}>Delivery is currently not available in your city. Click on the change location button in the top menu to update your city.</h6>)
            :
            (<p className="text-sm text-body">{description}</p>)
          }
        </Element>
      </article>
    </div>
  );
};

export default Details;
