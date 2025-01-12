import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import Label from '@/components/ui/forms/label';
import Radio from '@/components/ui/forms/radio/radio';
import TextArea from '@/components/ui/forms/text-area';
import { useTranslation } from 'next-i18next';
import * as yup from 'yup';
import { useModalState } from '@/components/ui/modal/modal.context';
import { Form } from '@/components/ui/forms/form';
import { AddressType } from '@/framework/utils/constants';
import { useUpdateUser } from '@/framework/user';
import AutocompleteAddress from "react-google-autocomplete";

type FormValues = {
  title: string;
  address: {
    country: string;
    city: string;
    state: string;
    street_address: string;
  };
};

const addressSchema = yup.object().shape({
  title: yup.string().required('error-title-required'),
  address: yup.object().shape({
    country: yup.string().required('error-country-required'),
    city: yup.string().required('error-city-required'),
    state: yup.string().required('error-state-required'),
    street_address: yup.string().required('error-street-required'),
  }),
});

export const AddressForm: React.FC<any> = ({
  onSubmit,
  defaultValues,
  isLoading,
}) => {
  const { t } = useTranslation('common');

  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      className="grid h-full grid-cols-2 gap-5"
      //@ts-ignore
      validationSchema={addressSchema}
      useFormProps={{
        shouldUnregister: true,
        defaultValues,
      }}
      resetValues={defaultValues}
    >
      {({ register, formState: { errors } }) => (
        <>

        {/*
          <div>
                <Label>{t('text-type')}</Label>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <Radio
                    id="shipping"
                    {...register('type')}
                    type="radio"
                    checked={true}
                    disabled={true}
                    value={AddressType.Shipping}
                    label={t('text-shipping')}
                  />
                </div>
              </div>

              setPlace(place);

        */}
          <Input
            label={t('text-title')}
            {...register('title')}
            error={t(errors.title?.message!)}
            variant="outline"
            className="col-span-2"
          />

          <AutocompleteAddress
            apiKey={'AIzaSyDs_8LnDD8HGjgkPO5hLk08MTFOk6FJus8'}
            id="shippingAddress-input"
            className="col-span-2 border border-border-400 text-sm px-3 py-3 rounded hover:border-accent focus:border-accent"
            placeholder="Enter street address"
            variant="outline"
            onPlaceSelected={(place) => {
              console.log("PLACE: " + place);
            }}
            options={{
              types: ["address"],
              componentRestrictions: { country: "ng" }
            }}
          />

          {/*
            <TextArea
              label={t('text-street-address')}
              {...register('address.street_address')}
              error={t(errors.address?.street_address?.message!)}
              variant="outline"
              className="col-span-2"
            />
          */}



          <Input
            label={t('text-country')}
            {...register('address.country')}
            error={t(errors.address?.country?.message!)}
            variant="outline"
          />

          <Input
            label={t('text-state')}
            {...register('address.state')}
            error={t(errors.address?.state?.message!)}
            variant="outline"
          />

          <Input
            label={t('text-city')}
            {...register('address.city')}
            error={t(errors.address?.city?.message!)}
            variant="outline"
          />

          <Button
            className="col-span-2 w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            {Boolean(defaultValues) ? t('text-update') : t('text-save')}{' '}
            {t('text-address')}
          </Button>
        </>
      )}
    </Form>
  );
};

export default function CreateOrUpdateAddressForm() {
  const { t } = useTranslation('common');
  const {
    data: { customerId, address },
  } = useModalState();
  //console.log(customerId, address, 'customerId, address');
  const { mutate: updateProfile } = useUpdateUser();

  function onSubmit(values: FormValues) {
  //  console.log('values:' + values);
    const formattedInput = {
      id: address?.id,
      // customer_id: customerId,
      title: values.title,
      type: 'shipping',
      address: {
        ...values.address,
      },
    };
    updateProfile({
      id: customerId,
      address: [formattedInput],
    });
  }
  return (
    <div className="min-h-screen bg-light p-5 sm:p-8 md:min-h-0 md:rounded-xl">
      <h1 className="mb-4 text-center text-lg font-semibold text-heading sm:mb-6">
        {address ? t('text-update') : t('text-add-new')} {t('text-address')}
      </h1>
      <AddressForm
        onSubmit={onSubmit}
        defaultValues={{
          title: address?.title ?? '',
          type: 'shipping' ?? '',
          address: {
            ...address?.address,
          },
        }}
      />
    </div>
  );
}
