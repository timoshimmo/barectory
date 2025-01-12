import useLayout from '@/lib/hooks/use-layout';
import Footer from './footer';
import Header from './header';
import Head from 'next/head';
import HeaderMinimal from './header-minimal';
import MobileNavigation from './mobile-navigation';

const SiteLayoutWithFooter: React.FC = ({ children }) => {
  const { layout } = useLayout();
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-150 bg-gray-100">
      <Head>
       <title>Barectory</title>
      </Head>
      <Header />
      {children}
      {/*<MobileNavigation />*/}
      <Footer />
    </div>
  );
};
export const getLayoutWithFooter = (page: React.ReactElement) => (
  <SiteLayoutWithFooter>{page}</SiteLayoutWithFooter>
);
export default SiteLayoutWithFooter;
