import { Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { Form } from '@/components/ui/forms/form';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';
import * as yup from 'yup';

type FormValues = {
  email: string;
};

const checkoutEmailSchema = yup.object().shape({
  email: yup.string().required('error-email-required'),
});

interface EmailFormProps {
  onSubmit: SubmitHandler<FormValues>;
  email?: string;
  isLoading?: boolean;
  view?: 'login' | undefined;
}
export default function EmailForm({
  email,
  onSubmit,
  isLoading,
  view,
}: EmailFormProps) {
  const { t } = useTranslation('common');

  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      validationSchema={checkoutEmailSchema}
      className="w-full"
      useFormProps={{
        defaultValues: {
          email: email,
        },
      }}
    >
      {({ control, formState: { errors } }) => (
        <div className="flex flex-col">
          <div className="flex w-full items-center md:min-w-[360px]">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  inputClass="!p-0 ltr:!pr-4 rtl:!pl-4 ltr:!pl-14 rtl:!pr-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base ltr:!border-r-0 rtl:!border-l-0 !rounded ltr:!rounded-r-none rtl:!rounded-l-none focus:!border-accent !h-12"
                />
              )}
            />
            <Button
              className="!text-sm ltr:!rounded-l-none rtl:!rounded-r-none"
              loading={isLoading}
              disabled={isLoading}
            >
              {view === 'login' ? (
                t('text-send-otp')
              ) : (
                <>
                  {Boolean(email) ? t('text-update') : t('text-add')}{' '}
                  {t('nav-menu-contact')}
                </>
              )}
            </Button>
          </div>
          {errors.email?.message && (
            <p className="mt-2 text-xs text-red-500 ltr:text-left rtl:text-right">
              {t(errors.email.message)}
            </p>
          )}
        </div>
      )}
    </Form>
  );
}
