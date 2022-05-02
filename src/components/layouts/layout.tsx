import useLayout from '@/lib/hooks/use-layout';
import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Header from './header';
import HeaderMinimal from './header-minimal';
import MobileNavigation from './mobile-navigation';
import Footer from './footer';
import { useMediaQuery } from 'react-responsive';
import HeaderMobile from './header-mobile';



export default function SiteLayout({ children }: React.PropsWithChildren<{}>) {
  const { layout } = useLayout();
  useEffect(() => {
    if (window.Tawk_API) {
     window.Tawk_API.hideWidget();
   }
  }, []);
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150">
      <Head>
       <title>Barectory</title>
      </Head>
      <div className="w-full desktop-layout">
        <Header layout="modern" />
      </div>
      <div className="w-full mobile-layout">
        <HeaderMobile />
      </div>
      {children}
      <Footer />
    </div>
  );
}
export const getLayout = (page: React.ReactElement) => (
  <SiteLayout>{page}</SiteLayout>
);
