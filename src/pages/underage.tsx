import Accordion from '@/components/ui/accordion';
import { faq } from '@/framework/static/faq';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';
import { Image } from '@/components/ui/image';
import Link from '@/components/ui/link';
import { ROUTES } from '@/lib/routes';
import noResult from '@/assets/no-result.svg';

export default function HelpPage() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title="Underage" url="underage" />
      <div className="main-container grid min-h-screen p-4 place-items-center sm:p-8">
        <div className="text-center">
          <p className="mb-4 text-sm tracking-widest uppercase text-body-dark 2xl: sm:mb-5">
            No underage drinking
          </p>
          <h1 className="mb-5 text-2xl font-bold leading-normal sm:text-3xl text-bolder">
            Too young to drink
          </h1>
          <div className="mb-11">
            <Image src={noResult} alt={t('404-heading')} />
          </div>
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

HelpPage.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
