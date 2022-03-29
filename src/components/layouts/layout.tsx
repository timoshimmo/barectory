import useLayout from '@/lib/hooks/use-layout';
import Head from 'next/head';
import Header from './header';
import HeaderMinimal from './header-minimal';
import MobileNavigation from './mobile-navigation';
import Footer from './footer';
import { useMediaQuery } from 'react-responsive';
import HeaderMobile from './header-mobile';


export default function SiteLayout({ children }: React.PropsWithChildren<{}>) {
  const { layout } = useLayout();
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)'
  })
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150">
      <Head>
       <title>Barectory</title>
      </Head>
      {isDesktopOrLaptop ? <Header layout={layout} /> : <HeaderMobile />}
      {children}
      <Footer />
    </div>
  );
}
export const getLayout = (page: React.ReactElement) => (
  <SiteLayout>{page}</SiteLayout>
);
