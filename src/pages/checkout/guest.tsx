import { useTranslation } from 'next-i18next';
import {
  billingAddressAtom,
  clearCheckoutAtom,
  shippingAddressAtom,
  verifiedResponseAtom,
} from '@/store/checkout';
import dynamic from 'next/dynamic';
import { getLayout } from '@/components/layouts/layout';
import { AddressType } from '@/framework/utils/constants';
import Seo from '@/components/seo/seo';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useUser } from '@/framework/user';
export { getStaticProps } from '@/framework/general.ssr';
import { useCart } from '@/store/quick-cart/cart.context';
import CartItem from '@/components/cart/checkout-cart-item';
import { CloseIcon } from '@/components/icons/close-icon';

const ScheduleGrid = dynamic(
  () => import('@/components/checkout/schedule/schedule-grid')
);
const GuestAddressGrid = dynamic(
  () => import('@/components/checkout/address-grid-guest')
);
const ContactGrid = dynamic(
  () => import('@/components/checkout/contact/contact-grid')
);

const EmailGrid = dynamic(
  () => import('@/components/checkout/email/email-grid')
);
const RightSideView = dynamic(
  () => import('@/components/checkout/right-side-view'),
  { ssr: false }
);
import { checkoutAtom } from '@/store/checkout';


export default function GuestCheckoutPage() {
  // const { me } = useUser();
  const { t } = useTranslation();
  const [, resetCheckout] = useAtom(clearCheckoutAtom);
  const [billingAddress] = useAtom(billingAddressAtom);
  const { items, totalUniqueItems, total, isEmpty } = useCart();
  const [shippingAddress] = useAtom(shippingAddressAtom);
  const [, emptyVerifiedResponse] = useAtom(verifiedResponseAtom);
//  const [isClosed, setIsClosed] = useState(false);
  useEffect(() => {
  //  resetCheckout();
    emptyVerifiedResponse(null);
  }, [emptyVerifiedResponse]);

  const [
    {
      shipping_address,
      delivery_time,
      coupon,
      verified_response,
      customer_contact,
      customer_email,
      customer_first_name,
      customer_last_name,
      payment_gateway,
      token,
    },
  ] = useAtom(checkoutAtom);

  function handleClearCheckout() {
  //  console.log("VERIFIED:" + verified_response);
    emptyVerifiedResponse(null);
  //  console.log("FIRST NAME:" + customer_first_name);
  }

  //!verified_response &&

  /*
    <EmailGrid
      className="bg-light p-5 shadow-700 md:p-8"
      email={null}
      label='Email'
      count={2}
    />

    <GuestAddressGrid
      className="bg-light p-5 shadow-700 md:p-8"
      label={t('text-billing-address')}
      count={3}
      addresses={billingAddress ? [billingAddress] : []}
      atom={billingAddressAtom}
      type={AddressType.Billing}
    />

  */

  //verified_response &&

  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <div className="main-container bg-gray-100 px-4 py-8 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <div className="m-auto flex w-full max-w-5xl flex-col items-center rtl:space-x-reverse lg:flex-row lg:items-start lg:space-x-8">
        {!verified_response &&
          (
            <div className="w-full space-y-6 lg:max-w-2xl">
              <ContactGrid
                className="bg-light p-5 shadow-700 md:p-8"
                email={customer_email}
                firstName={customer_first_name}
                lastName={customer_last_name}
                contact={customer_contact}
                label={'Contact Details'}
                count={1}
              />



              <GuestAddressGrid
                className="bg-light p-5 shadow-700 md:p-8"
                label={t('text-shipping-address')}
                count={2}
                addresses={shippingAddress ? [shippingAddress] : []}
                atom={shippingAddressAtom}
                type={AddressType.Shipping}
              />
              <ScheduleGrid
                className="bg-light p-5 shadow-700 md:p-8"
                label={t('text-delivery-schedule')}
                count={3}
              />
            </div>
          )

        }

        {verified_response &&
            (
              <div className="w-full space-y-6 lg:max-w-2xl">
                <div className="flex w-full justify-between items-center mb-5">
                  <p className="text-lg capitalize text-heading lg:text-xl text-dark font-bold">Order Details</p>
                  <button
                    className="flex items-center justify-center shrink-0 rounded text-muted font-semibold transition-all duration-200 focus:outline-none text-accent hover:text-accent focus:text-accent"
                    onClick={() => handleClearCheckout()}
                  >
                    Update
                  </button>
                </div>

                <div className="bg-light p-5 shadow-700 md:p-8">
                    <p className="text-lg capitalize text-heading mb-5 text-dark font-semibold">Contact Details</p>
                    <div className="flex w-full mb-3">
                      <div className="w-[50%] pr-2">
                        <label className="text-sm uppercase text-heading font-bold">First name</label>
                        <p className="text-sm capitalize text-heading">{customer_first_name}</p>
                      </div>
                      <div className="w-[50%] pl-2">
                        <label className="text-sm uppercase text-heading font-bold">Last name</label>
                        <p className="text-sm capitalize text-heading">{customer_last_name}</p>
                      </div>
                    </div>
                    <div className="flex w-full mb-3">
                      <div className="w-[50%] pr-2">
                        <label className="text-sm uppercase text-heading font-bold">Phone number</label>
                        <p className="text-sm capitalize text-heading">{customer_contact}</p>
                      </div>
                      <div className="w-[50%] pl-2">
                        <label className="text-sm uppercase text-heading font-bold mt-3">Email</label>
                        <p className="text-sm text-heading">{customer_email}</p>
                      </div>
                    </div>
                    <div className="w-full mb-3">
                      <label className="text-sm uppercase text-heading font-bold mt-3">Address</label>
                      <p className="text-sm capitalize text-heading">{shipping_address.address.formatted_address}</p>
                    </div>
                </div>

                <div className="bg-light p-5 shadow-700 md:p-8">
                    <p className="text-lg capitalize text-heading mb-5 text-dark font-semibold">Products</p>
                    <div className="w-full mb-3">
                      {items.length && (
                        items?.map((item) => <CartItem item={item} key={item.id} />)
                      )
                    }
                    </div>
                </div>
              </div>
            )
        }
          <div className="mt-10 mb-10 w-full sm:mb-12 lg:mb-0 lg:w-96">
            <RightSideView />
          </div>
        </div>
      </div>
    </>
  );
}
GuestCheckoutPage.getLayout = getLayout;
