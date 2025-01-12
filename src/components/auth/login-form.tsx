import { signIn } from 'next-auth/react';
import Logo from '@/components/ui/logo';
import Alert from '@/components/ui/alert';
import Input from '@/components/ui/forms/input';
import PasswordInput from '@/components/ui/forms/password-input';
import Button from '@/components/ui/button';
import { useTranslation } from 'next-i18next';
import * as yup from 'yup';
import { GoogleIcon } from '@/components/icons/google';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { useState } from 'react';
import { MobileIcon } from '@/components/icons/mobile-icon';
import { Form } from '@/components/ui/forms/form';
import { useLogin } from '@/framework/user';
import { useAtom } from 'jotai';
import type { LoginUserInput } from '@/types';
import { AnonymousIcon } from '@/components/icons/anonymous-icon';
import { useRouter } from 'next/router';
import { useToken } from '@/lib/hooks/use-token';
import { authorizationAtom } from '@/store/authorization-atom';
import { ROUTES } from '@/lib/routes';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import DB from '@/lib/firebaseinit';

const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('error-email-format')
    .required('error-email-required'),
  password: yup.string().required('error-password-required'),
});
function LoginForm() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { openModal, closeModal } = useModalAction();
  const isCheckout = router.pathname.includes('checkout');
  let [serverError, setServerError] = useState<string | null>(null);
//  const { mutate: login, isLoading, serverError, setServerError } = useLogin();
  const [loginLoading, setLoginLoading] = useState(false);
  const [_, setAuthorized] = useAtom(authorizationAtom);


  //console.log("CHECKOUT: " + isCheckout);

  /*
  login({
    email,
    password,
  });

  */

  function onSubmit({ email, password }: LoginUserInput) {


    if(!loginLoading) {
        const { setToken } = useToken();

        setLoginLoading(true);

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

          const user = userCredential.user;
          let permission = [];

          DB.collection("customer").doc(user.uid).get().then((doc) => {
              if (doc.exists) {

                if(!firebase.auth().currentUser.emailVerified) {
                  setLoginLoading(false);
                  setServerError("Email not verified. Click verification link in your email to verify account");
                }
                else {
                  const token = "jwt token";

                  localStorage.setItem('customer', JSON.stringify({ name: doc.data().name, userid: doc.data().uid, email: doc.data().email }));

                  setLoginLoading(false);
                  setToken(token);
                  setAuthorized(true);
                  closeModal();
                }
              }
              else {
                setLoginLoading(false);
                setServerError("User doesn't exist");
              }

          });

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoginLoading(false);
          setServerError('Invalid email or password');
        });

    }
  }

  return (
    <>
      <Alert
        variant="error"
        message={serverError && t(serverError)}
        className="mb-6"
        closeable={true}
        onClose={() => setServerError(null)}
      />
      <Form<LoginUserInput>
        onSubmit={onSubmit}
        validationSchema={loginFormSchema}
      >
        {({ register, formState: { errors } }) => (
          <>
            <Input
              label="Email"
              {...register('email')}
              type="email"
              variant="outline"
              className="mb-5"
              error={t(errors.email?.message!)}
            />
            <PasswordInput
              label="Password"
              {...register('password')}
              error={t(errors.password?.message!)}
              variant="outline"
              className="mb-5"
              forgotPageRouteOnClick={() => openModal('FORGOT_VIEW')}
            />
            <div className="mt-8">
              <Button
                className="h-11 w-full sm:h-12"
                loading={loginLoading}
                disabled={loginLoading}
              >
                Login
              </Button>
            </div>
          </>
        )}
      </Form>
      {/* //===============// */}
     <div className="relative mt-8 mb-6 flex flex-col items-center justify-center text-sm text-heading sm:mt-11 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute -top-2.5 bg-light px-2 ltr:left-2/4 ltr:-ml-4 rtl:right-2/4 rtl:-mr-4">
          {t('text-or')}
        </span>
      </div>
     <div className="mt-2 grid grid-cols-1 gap-4">
    {/*    <Button
          className="!bg-social-google !text-light hover:!bg-social-google-hover"
          disabled={isLoading}
          onClick={() => {
            signIn('google');
          }}
        >
          <GoogleIcon className="h-4 w-4 ltr:mr-3 rtl:ml-3" />
          {t('text-login-google')}
        </Button>
      */}


        {/*  <Button
            className="h-11 w-full !bg-gray-500 !text-light hover:!bg-gray-600 sm:h-12"
            disabled={isLoading}
            onClick={() => openModal('OTP_LOGIN')}
          >
            <MobileIcon className="h-5 text-light ltr:mr-2 rtl:ml-2" />
            {t('text-login-mobile')}
          </Button> */}

          {isCheckout && (
              <Button
                className="h-11 w-full !bg-pink-700 !text-light hover:!bg-pink-800 sm:h-12"
                disabled={loginLoading}
                onClick={() => router.push(`${ROUTES.CHECKOUT}/guest`)}
              >
                <AnonymousIcon className="h-6 text-light ltr:mr-2 rtl:ml-2" />
                {t('text-guest-checkout')}
              </Button>
            )
          }
      </div>

      <div className="text-center text-sm text-body mt-8 sm:text-base">
        Don't have an account {' '}
        <button
          onClick={() => openModal('REGISTER')}
          className="font-semibold text-accent underline transition-colors duration-200 hover:text-accent-hover hover:no-underline focus:text-accent-hover focus:no-underline focus:outline-none ltr:ml-1 rtl:mr-1"
        >
          Register
        </button>
      </div>
    </>
  );
}

export default function LoginView() {
  const { t } = useTranslation('common');
  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="mt-4 mb-8 text-center text-sm text-body sm:mt-5 sm:mb-10 md:text-base">
        Login in with your email & password
      </p>
      <LoginForm />
    </div>
  );
}
