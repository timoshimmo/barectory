import Head from 'next/head';
import Header from './header';
import React, { useEffect } from 'react';
import cn from 'classnames';
import MobileNavigation from './mobile-navigation';
import { Fragment } from 'react';
import Scrollbar from '@/components/ui/scrollbar';
import { ArrowDownIcon } from '@/components/icons/arrow-down';
import Link from '@/components/ui/link';
import { Menu, Transition } from '@headlessui/react';
import HeaderMobile from './header-mobile';
import Footer from './footer';

export default function GeneralLayout({
  children,
  layout,
}: React.PropsWithChildren<{ layout: string }>) {

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

export const getGeneralLayout = (page: React.ReactElement) => (
  <GeneralLayout layout={page.props.layout}>
    {page}
  {/* <MobileNavigation /> */}
  </GeneralLayout>
);
