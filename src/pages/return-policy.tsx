import { privacyPolicy } from '@/framework/static/privacy';
import { Link, Element } from 'react-scroll';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(' ').join('_');
}

export default function PrivacyPage() {
  const { t } = useTranslation('policy');
  const { title, date, content } = privacyPolicy;

  return (
    <>
      <Seo title="Return Policy" url="return-policy" />
      <section className="main-container mx-auto w-full max-w-1920 bg-light py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <header className="mb-10 sm:mt-2 lg:mb-14 xl:mt-4">
          <h1 className="mb-4 text-xl font-bold text-heading sm:mb-5 sm:text-3xl md:text-2xl 2xl:mb-7 2xl:text-4xl">
            Return Policy
          </h1>
          <p className="px-0.5 text-sm text-body-dark md:text-base 2xl:text-lg">
            {date}
          </p>
        </header>
        {/* End of page header */}
        <div className="pb-10"><span className="text-body-dark">As a firm committed to high-quality standards,
        it is our responsibility to ensure that products supplied to end-users are of the highest quality.
        <br /><br />To achieve this, we currently do not accept returns of products delivered to customers.
        This is due to the sensitive nature of the products involved. <br /><br />
        We can however accept a cancellation for your order at the point of purchase.
        This is also expressed by our shopping cart which allows you to remove items and adjust your resultant cost at your discretion.<br /><br />
        We also entertain the cancellation of orders before the items are shipped to you. This will attract the delivery cost associated with that sale.
        We will thus refund the amount charged, less the delivery cost in this instance. <br /><br />

        For further clarifications, kindly send an email to <a href= "mailto: barectorynigeria@gmail.com" className="text-accent">barectorynigeria@gmail.com</a></span></div>

      </section>
    </>
  );
}

PrivacyPage.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'policy'])),
    },
  };
};
