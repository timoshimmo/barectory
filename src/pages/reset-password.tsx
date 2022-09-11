import { Link, Element } from 'react-scroll';
import * as yup from 'yup';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import type {
  ResetPasswordUserInput,
} from '@/types';
import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';
import { ROUTES } from '@/lib/routes';
import Head from 'next/head';
import type { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/forms/form';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';
import { useModalAction } from '@/components/ui/modal/modal.context';
import PasswordInput from '@/components/ui/forms/password-input';
import {
  useResetPassword,
} from '@/framework/user';
import Logo from '@/components/ui/logo';
import Alert from '@/components/ui/alert';

const passwordFormValidation = yup.object().shape({
  password: yup.string().required(),
});

export default function ResetPasswordPage() {
  const { t } = useTranslation('common');
  const { mutate: resetPassword, isLoading: resetting } = useResetPassword();
  const passwordFormHandle: SubmitHandler<
    Pick<ResetPasswordUserInput, 'password'>
  > = ({ password }) => {
    resetPassword({ password, token: state.token, email: state.email });
  };

  return (
    <>
      <Seo title="Reset Password" url="reset-password" />
      <div className="main-container w-full grid min-h-[400px] p-4 place-items-center sm:p-8">
      <Head>
       <title>Barectory</title>
      </Head>
        <div className="order-1 lg:w-[700px] sm:w-full bg-light text-center text-center py-8 px-20">
          <Form<Pick<ResetPasswordUserInput, 'password'>>
            onSubmit={passwordFormHandle}
            useFormProps={{
              defaultValues: { password: '' },
            }}
            validationSchema={passwordFormValidation}
          >
            {({ register, formState: { errors } }) => (
              <>
                <PasswordInput
                  label={t('text-new-password')}
                  {...register('password')}
                  error={t(errors.password?.message!)}
                />
                <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                  <Button
                    className="w-full text-sm tracking-[0.2px] sm:order-2"
                    loading={resetting}
                    disabled={resetting}
                  >
                    {t('text-reset-password')}
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </>
  );
}

ResetPasswordPage.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
