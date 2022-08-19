import { useTranslation } from 'next-i18next';
import { billingAddressAtom, shippingAddressAtom, clearCheckoutAtom } from '@/store/checkout';
import dynamic from 'next/dynamic';
import { getLayout } from '@/components/layouts/layout';
import { AddressType } from '@/framework/utils/constants';
import Seo from '@/components/seo/seo';
import { useUser } from '@/framework/user';
export { getStaticProps } from '@/framework/general.ssr';
import { useCart } from '@/store/quick-cart/cart.context';
import CartItem from '@/components/cart/checkout-cart-item';
import { useAtom } from 'jotai';
import { checkoutAtom } from '@/store/checkout';
import { useEffect, useState } from 'react';

const ScheduleGrid = dynamic(
  () => import('@/components/checkout/schedule/schedule-grid')
);
const AddressGrid = dynamic(
  () => import('@/components/checkout/address-grid'),
  { ssr: false }
);
const ContactGrid = dynamic(
  () => import('@/components/checkout/contact/contact-grid')
);
const RightSideView = dynamic(
  () => import('@/components/checkout/right-side-view'),
  { ssr: false }
);

export default function CheckoutPage() {
  const { t } = useTranslation();
  const { me } = useUser();
  const { uid, address, profile, email, name } = me ?? {};
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [contact, setContact] = useState('');
  const [, resetCheckout] = useAtom(clearCheckoutAtom);
  const [uID, setUID] = useState('');
  const { items } = useCart();
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


  useEffect(() => {
      if(typeof me !== "undefined") {
        console.log("ME:" + JSON.stringify(me));
      //  setUID()
        const nameArr = me?.name.split(" ");
        setEmailAddress(me?.email);
        if(typeof nameArr !== "undefined") {
        //  console.log("NAME ARR:" + JSON.stringify(nameArr))
          setFirstName(nameArr[0]);
          setLastName(nameArr[1]);
        }
      }
  }, [setFirstName, setLastName, setEmailAddress, setContact, me]);

  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <div className="main-container px-4 py-8 bg-gray-100 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <div className="flex flex-col items-center w-full max-w-5xl m-auto rtl:space-x-reverse lg:flex-row lg:items-start lg:space-x-8">
        {!verified_response &&
          (
            <div className="w-full space-y-6 lg:max-w-2xl">
              <ContactGrid
                className="p-5 bg-light shadow-700 md:p-8"
                contact={profile?.contact}
                email={emailAddress}
                firstName={firstName}
                lastName={lastName}
                label={'Contact Details'}
                count={1}
              />
              {/*

                <AddressGrid
                  userId={id!}
                  className="p-5 bg-light shadow-700 md:p-8"
                  label={t('text-billing-address')}
                  count={2}
                  //@ts-ignore
                  addresses={address?.filter(
                    (item) => item?.type === AddressType.Billing
                  )}
                  atom={billingAddressAtom}
                  type={AddressType.Billing}
                />
              */}
              <AddressGrid
                userId={me?.uid!}
                className="p-5 bg-light shadow-700 md:p-8"
                label={t('text-shipping-address')}
                count={2}
                //@ts-ignore
                addresses={me?.address}
                atom={shippingAddressAtom}
                type={AddressType.Shipping}
              />
              <ScheduleGrid
                className="p-5 bg-light shadow-700 md:p-8"
                label={t('text-delivery-schedule')}
                count={3}
              />
            </div>
          )
        }
        {verified_response &&
          (
            <div className="w-full space-y-6 lg:max-w-2xl">
              <div className="w-full flex space-between">
                <p className="text-lg capitalize text-heading lg:text-xl mb-5 text-dark font-bold">Order Details</p>

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

          <div className="w-full mt-10 mb-10 sm:mb-12 lg:mb-0 lg:w-96">
            <RightSideView />
          </div>
        </div>
      </div>
    </>
  );
}

CheckoutPage.authenticationRequired = true;
CheckoutPage.getLayout = getLayout;
