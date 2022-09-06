import SubscriptionForm from '@/components/settings/subscription-form';
import { useSubscription } from '@/framework/settings';
import { useTranslation } from 'next-i18next';

type SubscribeToNewsletterProps = {
  title: string;
  description?: string;
};
export default function SubscribeToNewsletter({
  title,
  description,
}: SubscribeToNewsletterProps) {
  const { t } = useTranslation('common');
  const {
    mutate: subscribe,
    isLoading: loading,
    isSubscribed,
  } = useSubscription();

  function onSubmit({ email }: { email: string }) {
    subscribe({ email });
  }
  return (
    <div className="flex flex-col lg:flex-row lg:items-center">
      <div>
        <h3 className="mt-3 mb-1 text-xl font-semibold text-heading text-light">
          {t(title)}
        </h3>
        <p className="text-sm text-heading text-light mb-3">Subscribe now for our newsletters and featured news</p>
        <SubscriptionForm
          onSubmit={onSubmit}
          loading={loading}
          success={isSubscribed}
        />
      </div>

      {/*
        <h3 className="mt-3 mb-7 text-xl font-semibold text-heading text-light">
          {t(title)}
        </h3>
      */}


    </div>
  );
}
