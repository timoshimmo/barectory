import Logo from '@/components/ui/logo';
import cn from 'classnames';
import StaticMenu from './menu/static-menu';
import { useAtom } from 'jotai';
import { displayHeaderSearchAtom } from '@/store/display-header-search-atom';
import { displayMobileHeaderSearchAtom } from '@/store/display-mobile-header-search-atom';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { authorizationAtom } from '@/store/authorization-atom';
import { useIsHomePage } from '@/lib/use-is-homepage';
import { useEffect } from 'react';
import Link from '@/components/ui/link';
import Button from '@/components/ui/button';
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
import { useMediaQuery } from 'react-responsive';

const Header = ({ layout }: { layout: string }) => {
  const { t } = useTranslation('common');
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const [displayHeaderSearch, setDisplayHeaderSearch] = useAtom(
    displayHeaderSearchAtom
  );
  const [displayMobileHeaderSearch] = useAtom(displayMobileHeaderSearchAtom);
  const { openModal } = useModalAction();
  const [isAuthorize] = useAtom(authorizationAtom);
  const isHomePage = useIsHomePage();
  useEffect(() => {
    //if (!isHomePage) {
      setDisplayHeaderSearch(true);
  //  }
  }, [isHomePage, setDisplayHeaderSearch]);
  const isFlattenHeader =
    !displayHeaderSearch && isHomePage && layout !== 'modern';

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
    <header
      className={cn('site-header-with-search h-14 md:h-16 lg:h-22', {
        'lg:!h-auto': isFlattenHeader,
      })}
    >
      <div
        className={cn(
          'fixed flex justify-between items-center w-full h-14 md:h-16 lg:h-22 px-4 lg:px-8 py-5 z-50 header-modern-primary border-b border-border-200 shadow-sm transition-transform duration-300 transform-gpu',
          {
            'lg:absolute lg:bg-transparent lg:shadow-none lg:border-0':
              isFlattenHeader,
          }
        )}
      >

          <div className="flex items-center w-full lg:w-auto">
            <Logo className="mx-0" />
          </div>

          <div className="w-full px-10 mx-auto overflow-hidden lg:block xl:w-11/12 2xl:w-10/12">
            <SearchWithSuggestion label={t('text-search-label')} variant="minimal" />
          </div>

          <ul className="items-center shrink-0 hidden lg:flex space-x-10 rtl:space-x-reverse">
            <CartCounterIconButton />
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button className="font-semibold" size="small" onClick={handleJoin}>
                Login
              </Button>
              {isAuthorize ? <AuthorizedMenu minimal={true} /> : <JoinButton />}
            </div>
          </ul>
      </div>
    </header>
  );
};

export default Header;
