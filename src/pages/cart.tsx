import { useRouter } from 'next/router';
import { motion, AnimateSharedLayout } from 'framer-motion';
import BackButton from '@/components/ui/back-button';
import CartItem from '@/components/cart/cart-item';
import { fadeInOut } from '@/lib/motion/fade-in-out';
import { ROUTES } from '@/lib/routes';
import usePrice from '@/lib/use-price';
import { getLayout } from '@/components/layouts/layout';
import { useCart } from '@/store/quick-cart/cart.context';
import { formatString } from '@/lib/format-string';
import { useTranslation } from 'next-i18next';
import CartCheckBagIcon from '@/components/icons/cart-check-bag';
import { CloseIcon } from '@/components/icons/close-icon';
import Seo from '@/components/seo/seo';
import dynamic from 'next/dynamic';
import ItemCard from '@/components/checkout/item/item-card';
import EmptyCartIcon from '@/components/icons/empty-cart';
import { ItemInfoRow } from '@/components/checkout/item/item-info-row';
import { CheckAvailabilityAction } from '@/components/checkout/check-availability-action';
import Footer from '@/components/layouts/footer';
import { useModalAction } from '@/components/ui/modal/modal.context';
import Button from '@/components/ui/button';

const CartPage = () => {
  const { t } = useTranslation('common');
  const { items, totalUniqueItems, total, isEmpty } = useCart();
  const router = useRouter();
  const { openModal } = useModalAction();

  function handleCheckout() {
    const isRegularCheckout = items.find((item) => !Boolean(item.is_digital));
    if (isRegularCheckout) {
      router.push(ROUTES.CHECKOUT);
    } else {
      router.push(ROUTES.CHECKOUT_DIGITAL);
    }

  }

  function handleContinue() {
    router.push(ROUTES.HOME);
    //router.back
  }

  function handleJoin() {
    return openModal('LOGIN_VIEW');
  }

  const { price: subtotal } = usePrice(
    items && {
      amount: total,
    }
  );

  //const [verifiedResponse] = useAtom(verifiedResponseAtom);

  return (
    <>
      <Seo title={'Cart'} url={'cart'} />
      <div className="px-4 py-8 bg-light lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20" style={{ marginTop: 120 }}>
        <div className="flex flex-col items-center w-full max-w-5xl m-auto rtl:space-x-reverse lg:flex-row lg:items-start lg:space-x-8">
          <div className="w-full space-y-6">
            <section className="flex flex-col h-full relative">
              {/*

                <header className="fixed max-w-md w-full top-0 z-10 bg-light py-4 px-6 flex items-center justify-between border-b border-border-200 border-opacity-75">
                  <div className="flex text-accent font-semibold">
                    <CartCheckBagIcon className="shrink-0" width={24} height={22} />
                    <span className="flex ltr:ml-2 rtl:mr-2">
                      {formatString(totalUniqueItems, 'item')}
                    </span>
                  </div>
                  <button
                    onClick={() => closeSidebar({ display: false, view: '' })}
                    className="w-7 h-7 ltr:ml-3 rtl:mr-3 ltr:-mr-2 rtl:-ml-2 flex items-center justify-center rounded-full text-muted bg-gray-100 transition-all duration-200 focus:outline-none hover:bg-accent focus:bg-accent hover:text-light focus:text-light"
                  >
                    <span className="sr-only">{t('text-close')}</span>
                    <CloseIcon className="w-3 h-3" />
                  </button>
                </header>

              */}
              {/* End of cart header */}

              <AnimateSharedLayout>
                <motion.div layout className="flex-grow pt-16 pb-20">
                  {items.length > 0 ? (
                    items?.map((item) => <CartItem item={item} key={item.id} />)
                  ) : (
                    <motion.div
                      layout
                      initial="from"
                      animate="to"
                      exit="from"
                      variants={fadeInOut(0.25)}
                      className="h-full flex flex-col items-center justify-center"
                    >
                      <EmptyCartIcon width={140} height={176} />
                      <h4 className="mt-4 mb-3 text-base font-semibold">
                        No Products
                      </h4>
                      <Button
                      variant="outline"
                      onClick={handleContinue}
                      className="focus:outline-none"
                      >
                        <span>Continue To Shop</span>
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimateSharedLayout>
              {/* End of cart items */}

              {/* <footer className="sticky ltr:left-0 rtl:right-0 bottom-0 w-full py-5 px-6 z-10 bg-light"> */}
              {/*

                <footer className="fixed bottom-0 w-full max-w-md py-5 px-6 z-10 bg-light">
                  <button
                    className="flex justify-between w-full h-12 md:h-14 p-1 text-sm font-bold bg-accent rounded-full shadow-700 transition-colors focus:outline-none hover:bg-accent-hover focus:bg-accent-hover"
                    onClick={handleCheckout}
                  >
                    <span className="flex flex-1 items-center h-full px-5 text-light">
                      {t('text-checkout')}
                    </span>
                    <span className="flex items-center shrink-0 h-full bg-light text-accent rounded-full px-5">
                      {totalPrice}
                    </span>
                  </button>
                </footer>
              */}
              {/* End of footer */}
            </section>
          </div>
          {items.length > 0 && (<div className="w-full mt-10 mb-10 sm:mb-12 lg:mb-0 lg:w-96">
            <div className="w-full">
                <div className="flex flex-col items-center mb-4 space-x-4 rtl:space-x-reverse">
                  <span className="text-base font-bold text-heading">
                    Order
                  </span>
                </div>
              {/*<div className="flex flex-col py-3 border-b border-border-200">
                {isEmpty ? (
                  <div className="flex flex-col items-center justify-center h-full mb-4">
                    <EmptyCartIcon width={140} height={176} />
                    <h4 className="mt-6 text-base font-semibold">
                      No Products
                    </h4>
                  </div>
                ) : (
                  items?.map((item) => <ItemCard item={item} key={item.id} />)
                )}
              </div>*/}
              <div className="mt-4 space-y-2">
                <ItemInfoRow title={'Sub-total'} value={subtotal} />
                <ItemInfoRow
                  title={'Tax'}
                  value={'0'}
                />
                <ItemInfoRow
                  title={'Shipping'}
                  value={'0'}
                />
              </div>
              <button
                className="flex justify-center mt-5 items-center w-full h-12 md:h-14 p-1 text-sm font-bold bg-accent rounded shadow-700 transition-colors focus:outline-none hover:bg-accent-hover focus:bg-accent-hover"
                onClick={handleCheckout}
              >
                <span className="flex flex-1 justify-center items-center h-full px-5 text-light">
                  Checkout as guest
                </span>
              </button>

              <button
                className="flex justify-center mt-2 items-center w-full h-12 md:h-14 p-1 text-sm font-bold bg-accent rounded shadow-700 transition-colors focus:outline-none hover:bg-accent-hover focus:bg-accent-hover"
                onClick={handleCheckout}
              >
                <span className="flex flex-1 justify-center items-center h-full px-5 text-light">
                  Sign In & Chekcout
                </span>
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
      </>

  );


}
CartPage.getLayout = getLayout;
export default CartPage;
