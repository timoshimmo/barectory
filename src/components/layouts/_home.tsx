import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useAtom } from 'jotai';
import cn from 'classnames';
const Header = dynamic(() => import('./header'), {
  ssr: false,
});
import HeaderMobile from './header-mobile';
import HeaderMinimal from './header-minimal';
import MobileNavigation from './mobile-navigation';
import Footer from './footer';
import { SearchIcon } from '@/components/icons/search-icon';
import { displayMobileHeaderSearchAtom } from '@/store/display-mobile-header-search-atom';
import Link from '@/components/ui/link';
import { useMediaQuery } from 'react-responsive';


export default function HomeLayout({
  children,
  layout,
}: React.PropsWithChildren<{ layout: string }>) {
  const { t } = useTranslation('common');
  const [, setDisplayMobileHeaderSearch] = useAtom(
    displayMobileHeaderSearchAtom
  );

  const [mediaQuery, setIsMediaQuey] = useState(true);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)'
  })

  useEffect(() => {
    if(!isDesktopOrLaptop) {
      setIsMediaQuey(false);
    }
  }, [mediaQuery]);


  {/*
    {['minimal', 'compact'].includes(layout) ? (
      <HeaderMinimal layout={layout} />
    ) : (
      <Header layout={layout} />
    )}
     */}
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-150 bg-gray-100">
      <Head>
       <title>Barectory</title>
     </Head>
     <div className="w-full desktop-layout">
       <Header layout="modern" />
     </div>
     <div className="w-full mobile-layout">
       <HeaderMobile />
     </div>
      <div className="min-h-screen">{children}</div>
    {/*

      <MobileNavigation>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setDisplayMobileHeaderSearch((prev) => !prev)}
            className="flex items-center justify-center h-full p-2 focus:outline-none focus:text-accent"
          >
            <span className="sr-only">{t('text-search')}</span>
            <SearchIcon width="17.05" height="18" />
          </motion.button>
        </MobileNavigation>
    */}
      <Footer />
    </div>
  );
}
