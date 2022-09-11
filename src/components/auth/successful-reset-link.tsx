import { useRouter } from 'next/router';
import Logo from '@/components/ui/logo';
import Button from '@/components/ui/button';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@/components/ui/modal/modal.context';

export default function SuccessfulRegView() {

  const { t } = useTranslation('common');
  const router = useRouter();
  const { openModal, closeModal } = useModalAction();

  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
      <div className="flex justify-center">
        <Logo />
      </div>
      <h6 className="mt-4 px-2 text-center text-accent font-bold text-heading text-2xl">Reset Link Sent</h6>
      <p className="mt-2 mb-7 px-2 text-center text-sm leading-relaxed sm:mt-5 sm:mb-10 sm:px-0">
        A reset link has been sent to your email.<br/>
        Click on that link to change your password
      </p>
      <p className="mt-1 mb-7 px-2 text-center text-xs text-gray-500">NOTE: If you do not see the mail in your inbox. Please check your spam mail.</p>
    {/*
      <div className="text-center text-sm text-body sm:text-base">
         <button
           onClick={() => openModal('LOGIN_VIEW')}
           className="font-semibold text-accent underline transition-colors duration-200 hover:text-accent-hover hover:no-underline focus:text-accent-hover focus:no-underline focus:outline-none ltr:ml-1 rtl:mr-1"
         >
           Login
         </button>
       </div>
    */}
    </div>
  );


}
