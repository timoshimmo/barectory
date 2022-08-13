import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import { useCreateOrder, useOrderStatuses, useVerifyOrder } from '@/framework/order';
import ValidationError from '@/components/ui/validation-error';
import Button from '@/components/ui/button';
import { formatOrderedProduct } from '@/lib/format-ordered-product';
import { useCart } from '@/store/quick-cart/cart.context';
import { checkoutAtom, discountAtom, walletAtom, shippingAddressAtom } from '@/store/checkout';
import {
  calculatePaidTotal,
  calculateTotal,
} from '@/store/quick-cart/cart.utils';
import { usePaystackPayment } from 'react-paystack';
import omit from 'lodash/omit';

export const PlaceOrderAction: React.FC<{ className?: string }> = (props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { createOrder, isLoading } = useCreateOrder();

  let userData = {};
  if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('customer');
      if(user !== null) {
        const data = JSON.parse(user);
        userData = data;
      }
  }
  const userId = userData.userid ?? null;
  /*const { mutate: verifyCheckout } = useVerifyOrder();

  const [shipping_address] = useAtom(shippingAddressAtom);
  const { items, total, isEmpty } = useCart();

  const { mutate: verifyCheckout, isLoading: loading } = useVerifyOrder();

  function handleVerifyCheckout() {
    verifyCheckout({
      amount: total,
      products: items?.map((item) => formatOrderedProduct(item)),
      shipping_address: {
        ...(shipping_address?.address &&
          omit(shipping_address.address, ['__typename'])),
      }
    });
  }
*/

  const { orderStatuses } = useOrderStatuses({
    limit: 1,
  });

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
  const [discount] = useAtom(discountAtom);
  const [use_wallet_points] = useAtom(walletAtom);

  useEffect(() => {
    setErrorMessage(null);
  }, [payment_gateway]);

  const available_items = items?.filter(
    (item) => !verified_response?.unavailable_products?.includes(item.id)
  );

  const subtotal = calculateTotal(available_items);

  /*
  shipping_address: {
    ...(shipping_address?.address && shipping_address.address),
  },
  */

  const total = calculatePaidTotal(
    {
      totalAmount: subtotal,
      tax: verified_response?.total_tax!,
      shipping_charge: verified_response?.shipping_charge!,
    },
    Number(discount)
  );
  const handlePlaceOrder = () => {
    {/*
      if (!customer_contact) {
      setErrorMessage('Contact Number Is Required');
      return;

    }*/}
    let input = {
      //@ts-ignore
      products: available_items?.map((item) => formatOrderedProduct(item)),
      status: orderStatuses[0]?.id ?? '1',
      amount: subtotal,
      coupon_id: Number(coupon?.id),
      discount: discount ?? 0,
      paid_total: total,
      sales_tax: verified_response?.total_tax,
      delivery_fee: verified_response?.shipping_charge,
      total,
      delivery_time: delivery_time?.title,
      customer: { id: userId, name: `${customer_first_name} ${customer_last_name}`, email: customer_email},
      customer_contact,
      use_wallet_points,
      payment_gateway: "Paystack",
      shipping_address: shipping_address,
    };
  /*  if (payment_gateway === 'PAYSTACK') {
      //@ts-ignore
      input.token = token;
    }*/

    console.log("ORDER INPUTS:" + JSON.stringify(input));

    //delete input.shipping_address.__typename;
    //@ts-ignore
    createOrder(input);
  };

  const config = {
      reference: (new Date()).getTime().toString(),
      email: "user@example.com",
      amount: total * 100,
      publicKey: 'pk_test_67801597b3230b96562d8443af365f39c98c173b',
  };


  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    handlePlaceOrder();
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const isDigitalCheckout = available_items.find((item) =>
    Boolean(item.is_digital)
  );

  const formatRequiredFields = isDigitalCheckout
    ? [customer_email, available_items]
    : [
      customer_email,
      customer_first_name,
      customer_last_name,
      shipping_address,
      ];
  const isAllRequiredFieldSelected = formatRequiredFields.every(
    (item) => !isEmpty(item)
  );

  const PaystackHookExample = () => {
     const initializePayment = usePaystackPayment(config);
     //Object.keys(shipping_address).length
     //console.log("SHIPPING: " , customer_email.length);

     //initializePayment(onSuccess, onClose)
     return (
       <div>
       {!use_wallet_points ?
          ( <Button
           className="w-full mt-5 bg-accent text-light px-5 py-0 h-12 border border-transparent hover:bg-accent-hover inline-flex items-center justify-center shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700"
           disabled={shipping_address === null || customer_email.length < 4}

           onClick={() => {
              handlePlaceOrder()
           }}>Pay</Button>
         )
         :
         (
           <Button
            className="w-full mt-5 bg-accent text-light px-5 py-0 h-12 border border-transparent hover:bg-accent-hover inline-flex items-center justify-center shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700"
            disabled={shipping_address === null || customer_email.length < 4}

            onClick={() => {
                initializePayment(onSuccess, onClose)
            }}>Pay</Button>
         )
       }

       </div>
     );
 };
  return (
    <>
      {/*
        <Button
          loading={isLoading}
          className={classNames('mt-5 w-full', props.className)}
          onClick={handlePlaceOrder}
          disabled={!isAllRequiredFieldSelected}
          {...props}
        />
      */}
      <PaystackHookExample />
      {errorMessage && (
        <div className="mt-3">
          <ValidationError message={errorMessage} />
        </div>
      )}
    </>
  );
};
