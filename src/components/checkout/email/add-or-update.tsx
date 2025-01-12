import { useModalAction } from '@/components/ui/modal/modal.context';
import OtpForm from '@/components/otp/otp-form';
import { customerEmailAtom } from '@/store/checkout';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import { useSettings } from '@/framework/settings';
import EmailForm from '@/components/email/email-form';

export default function AddOrUpdateEmail() {
  const { t } = useTranslation('common');
  const {
    settings: { useOtp },
  } = useSettings();
  const { closeModal } = useModalAction();
  const [contactEmail, setContactEmail] = useAtom(customerEmailAtom);

  function onSubmit({ email }: { email: string }) {
    console.log("Email:" + email);
    setContactEmail(email);
    closeModal();
  }
  return (
    <div className="flex flex-col justify-center min-h-screen p-5 bg-light sm:p-8 md:min-h-0 md:rounded-xl">
      <h1 className="mb-5 text-sm font-semibold text-center text-heading sm:mb-6">
        {contactEmail ? t('text-update') : t('text-add-new')}{' '}
        Email
      </h1>
      <EmailForm onSubmit={onSubmit} email={contactEmail} />
    </div>
  );
}
