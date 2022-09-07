import { Link, Element } from 'react-scroll';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';
import { ROUTES } from '@/lib/routes';

export default function VerifiedRegPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Seo title="Verified" url="verified" />
      <div className="main-container w-full grid min-h-[400px] p-4 place-items-center sm:p-8">
        <div className="order-1 w-100 bg-light text-center text-center py-8 px-20">
          <h1 className="mb-5 text-2xl font-bold leading-normal sm:text-3xl text-bolder">
            Registration Complete
          </h1>
          <p className="mb-4 text-sm tracking-widest uppercase text-body-dark 2xl: sm:mb-5">
            Your account has successfully been verified.
          </p>
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center underline sm:text-base text-bolder focus:outline-none hover:no-underline hover:text-body-dark"
          >
            {t('404-back-home')}
          </Link>
        </div>
      </div>
    </>
  );
}

VerifiedRegPage.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
