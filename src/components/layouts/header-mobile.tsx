import Logo from '@/components/ui/logo';
import cn from 'classnames';
import StaticMenu from './menu/static-menu';
import { useAtom } from 'jotai';
import { displayHeaderSearchAtom } from '@/store/display-header-search-atom';
import { displayMobileHeaderSearchAtom } from '@/store/display-mobile-header-search-atom';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { authorizationAtom } from '@/store/authorization-atom';
import { useEffect } from 'react';
import Link from '@/components/ui/link';
import Button from '@/components/ui/button';
import { CartOutlinedIcon } from '@/components/icons/cart-outlined';
import GroupsDropdownMenu from './menu/groups-menu';
const Search = dynamic(() => import('@/components/ui/search/search'));
import SearchWithSuggestion from '@/components/ui/search/search-with-suggestion';
const AuthorizedMenu = dynamic(() => import('./menu/authorized-menu'), {
  ssr: false,
});
const CartCounterIconButton = dynamic(
  () => import('@/components/cart/cart-counter-icon-button'),
  { ssr: false }
);
const JoinButton = dynamic(() => import('./menu/join-button'), { ssr: false });
import { useModalAction } from '@/components/ui/modal/modal.context';
import { drawerAtom } from '@/store/drawer-atom';
import { useIsRTL } from '@/lib/locals';
import { NavbarIcon } from '@/components/icons/navbar-icon';
import { useCart } from '@/store/quick-cart/cart.context';


const HeaderMobile = () => {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  const [isAuthorize] = useAtom(authorizationAtom);
  const [_, setDrawerView] = useAtom(drawerAtom);
  const { isRTL } = useIsRTL();
  const { totalUniqueItems } = useCart();
  const [showCart, setDisplayCart] = useAtom(drawerAtom);

  function handleCartSidebar() {
    setDisplayCart({ display: true, view: 'cart' });
  }

  function handleSidebar(view: string) {
    setDrawerView({ display: true, view });
  }

  function handleJoin() {
    return openModal('LOGIN_VIEW');
  }

{/*

  {isHomePage ? (
    <>
      {(displayHeaderSearch || layout === 'modern') && (
        <div className="hidden w-full px-10 mx-auto overflow-hidden lg:block xl:w-11/12 2xl:w-10/12">
          <SearchWithSuggestion label={t('text-search-label')} variant="minimal" />
        </div>
      )}

      {displayMobileHeaderSearch && (
        <div className="block lg:hidden w-full absolute top-0 ltr:left-0 rtl:right-0 h-full bg-light pt-1.5 md:pt-2 px-5">
          <SearchWithSuggestion label={t('text-search-label')} variant="minimal" />
        </div>
      )}
    </>
  ) : null}

  <Link
    onClick={handleJoin}
    href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/register`}
    variant="button"
    target="_blank"
  >
    {t('Login')}
  </Link>

  <SearchWithSuggestion label={t('text-search-label')} variant="minimal" />
*/}


  return (
    <div className="fixed w-full">
      <header
        className={cn('site-header-with-search h-14 md:h-16 lg:h-22')}
      >
        <div
          className={cn(
            'flex justify-between bg-accent w-full h-14 md:h-16 lg:h-22 px-4 lg:px-8 py-2 z-50 header-modern-primary border-b border-border-200 shadow-sm transition-transform duration-300 transform-gpu'
          )}
        >

            <div className="flex items-center w-100 h-full mr-1">
              <button
                className="product-cart lg:flex relative"
                onClick={() => handleSidebar('MAIN_MENU_VIEW')}
              >
                <NavbarIcon className={`${isRTL && 'transform rotate-180 '} text-light`} />
              </button>
            </div>
            <div className="flex items-center justify-center w-full">
              <Logo className="mx-0" />
            </div>
            <div className="flex items-center w-100 h-full">
              <button
                className="product-cart lg:flex relative"
                onClick={handleCartSidebar}
              >
                <CartOutlinedIcon className="w-5 h-5 text-light" />
                {totalUniqueItems > 0 && (
                  <span className="min-w-[20px] h-5 flex items-center justify-center rounded-full bg-light text-primary text-[10px] absolute ltr:-right-1/2 rtl:-left-1/2 -top-1/2">
                    {totalUniqueItems}
                  </span>
                )}
              </button>
            </div>

        </div>
        </header>
        <div className="block h-5 w-full px-5 py-2 mb-3">
          <SearchWithSuggestion label={t('text-search-label')} variant="minimal" />
        </div>
      </div>
  );
};

export default HeaderMobile;
