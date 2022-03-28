import Logo from '@/components/ui/logo';
import cn from 'classnames';
import StaticMenu from './menu/static-menu';
import { useState, useEffect, Fragment } from 'react';
import { useAtom } from 'jotai';
import { displayHeaderSearchAtom } from '@/store/display-header-search-atom';
import { displayMobileHeaderSearchAtom } from '@/store/display-mobile-header-search-atom';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { authorizationAtom } from '@/store/authorization-atom';
import { useIsHomePage } from '@/lib/use-is-homepage';
import Link from '@/components/ui/link';
import { Menu, Transition } from '@headlessui/react';
import Scrollbar from '@/components/ui/scrollbar';
import Button from '@/components/ui/button';
import { ArrowDownIcon } from '@/components/icons/arrow-down';
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
    query: '(min-width: 768px)'
  })
  const [displayHeaderSearch, setDisplayHeaderSearch] = useAtom(
    displayHeaderSearchAtom
  );
  const [displayMobileHeaderSearch] = useAtom(displayMobileHeaderSearchAtom);
  const { openModal } = useModalAction();
  const [isAuthorize] = useAtom(authorizationAtom);
  const isHomePage = useIsHomePage();
/*  useEffect(() => {
    //if (!isHomePage) {
      setDisplayHeaderSearch(true);
  //  }
}, [isHomePage, setDisplayHeaderSearch]);*/
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
    <div className="fixed w-full z-50 header-modern-primary bg-gray-100 border-b border-border-200 shadow-sm">
      <header
        className={cn('site-header-with-search h-14 md:h-16 bg-accent lg:h-22')}
      >
        <div
          className={cn(
            'flex justify-between items-center w-full h-14 md:h-16 lg:h-22 px-4 lg:px-8 py-5 transition-transform duration-300 transform-gpu'
          )}
        >

          <div className="flex items-center w-full lg:w-auto">
            <Logo className="mx-0" />
          </div>

          <div className="w-full px-10 py-3 mx-auto lg:block xl:w-11/12 2xl:w-10/12">
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
      <div className="px-5 flex">
          <Menu
            as="div"
            className="relative inline-block ltr:text-left rtl:text-right z-10"
          >
            <Menu.Button
              className={cn(
                'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading xl:px-4'
              )}
            >
              {({ open }) => (
                <>
                  <span className="whitespace-nowrap text-sm">Beer</span>
                  <span className="flex ltr:pl-2.5 rtl:pr-2.5 pt-1 ltr:ml-auto rtl:mr-auto">
                      <ArrowDownIcon
                        className={cn('h-3 w-3', {
                          'transform rotate-180': open,
                        })}
                      />
                  </span>
                </>
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="ul"
                className={cn(
                  'absolute py-2 z-100 w-40 h-auto lg:h-72 2xl:h-auto min-h-40 max-h-56 sm:max-h-72 2xl:max-h-screen bg-light rounded shadow-700 focus:outline-none overflow-hidden'
                )}
              >
                <Scrollbar
                  className="w-full h-full"
                  options={{
                    scrollbars: {
                      autoHide: 'never',
                    },
                  }}
                >
                    <Menu.Item key={1}>
                      {({ active }) => (
                        <Link
                          href='grocery/search?category=sparkling-wine'
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                            active ? 'text-accent' : 'text-body-dark'
                          )}
                        >
                          <span>Ale</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item key={2}>
                      {({ active }) => (
                        <Link
                          href='grocery/search?category=sparkling-wine'
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                            active ? 'text-accent' : 'text-body-dark'
                          )}
                        >
                          <span>Lager</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item key={3}>
                      {({ active }) => (
                        <Link
                          href='grocery/search?category=sparkling-wine'
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                            active ? 'text-accent' : 'text-body-dark'
                          )}
                        >
                          <span>Stout</span>
                        </Link>
                      )}
                    </Menu.Item>
                </Scrollbar>
              </Menu.Items>
            </Transition>
          </Menu>
          <Menu
            as="div"
            className="relative inline-block ltr:text-left rtl:text-right z-10"
          >
            <Menu.Button
              className={cn(
                'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading xl:px-4'
              )}
            >
              {({ open }) => (
                <>
                  <span className="whitespace-nowrap text-sm">Ready to drink</span>
                  <span className="flex ltr:pl-2.5 rtl:pr-2.5 pt-1 ltr:ml-auto rtl:mr-auto">
                      <ArrowDownIcon
                        className={cn('h-3 w-3', {
                          'transform rotate-180': open,
                        })}
                      />
                  </span>
                </>
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="ul"
                className={cn(
                  'absolute py-2 z-100 w-38 h-56 lg:h-72 2xl:h-auto min-h-40 max-h-56 sm:max-h-72 2xl:max-h-screen bg-light rounded shadow-700 focus:outline-none overflow-hidden'
                )}
              >
                <Scrollbar
                  className="w-full h-full"
                  options={{
                    scrollbars: {
                      autoHide: 'never',
                    },
                  }}
                >
                    <Menu.Item key={1}>
                      {({ active }) => (
                        <Link
                          href='grocery/search?category=vermouth'
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                            active ? 'text-accent' : 'text-body-dark'
                          )}
                        >
                          <span>Smirnoff Ice</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item key={2}>
                      {({ active }) => (
                        <Link
                          href='grocery/search?category=vermouth'
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                            active ? 'text-accent' : 'text-body-dark'
                          )}
                        >
                          <span>Origin</span>
                        </Link>
                      )}
                    </Menu.Item>
                </Scrollbar>
              </Menu.Items>
            </Transition>
          </Menu>
          <Menu
            as="div"
            className="relative inline-block ltr:text-left rtl:text-right z-10"
          >
            <Menu.Button
              className={cn(
                'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading xl:px-4 mr-1'
              )}
            >
              {({ open }) => (
                <>
                  <span className="whitespace-nowrap text-sm">Spirits</span>
                  <span className="flex ltr:pl-2.5 rtl:pr-2.5 pt-1 ltr:ml-auto rtl:mr-auto">
                      <ArrowDownIcon
                        className={cn('h-3 w-3', {
                          'transform rotate-180': open,
                        })}
                      />
                  </span>
                </>
              )}
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="ul"
                className={cn(
                  'absolute py-2 z-100 w-38 h-56 lg:h-72 2xl:h-auto min-h-40 max-h-56 sm:max-h-72 2xl:max-h-screen bg-light rounded shadow-700 focus:outline-none overflow-hidden'
                )}
              >
                <Scrollbar
                  className="w-full h-full"
                  options={{
                    scrollbars: {
                      autoHide: 'never',
                    },
                  }}
                >
                    <Menu.Item key={1}>
                      {({ active }) => (
                        <Link
                          href='/grocery/search?category=vermouth'
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                            active ? 'text-accent' : 'text-body-dark'
                          )}
                        >
                          <span>Vermouth</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item key={2}>
                      {({ active }) => (
                        <Link
                          href='/grocery/search?category=whisky'
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                            active ? 'text-accent' : 'text-body-dark'
                          )}
                        >
                          <span>Whisky</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item key={3}>
                      {({ active }) => (
                        <Link
                          href='/grocery/search?category=vodka'
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                            active ? 'text-accent' : 'text-body-dark'
                          )}
                        >
                          <span>Vodka</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item key={4}>
                      {({ active }) => (
                        <Link
                          href='grocery/search?category=gin'
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                            active ? 'text-accent' : 'text-body-dark'
                          )}
                        >
                          <span>Gin</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item key={5}>
                      {({ active }) => (
                        <Link
                          href='grocery/search?category=rum'
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                            active ? 'text-accent' : 'text-body-dark'
                          )}
                        >
                          <span>Rum</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item key={6}>
                      {({ active }) => (
                        <Link
                          href='grocery/search?category=tequila'
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                            active ? 'text-accent' : 'text-body-dark'
                          )}
                        >
                          <span>Tequila</span>
                        </Link>
                      )}
                    </Menu.Item>
                </Scrollbar>
              </Menu.Items>
            </Transition>
          </Menu>
          <Menu
            as="div"
            className="relative inline-block ltr:text-left rtl:text-right z-10"
          >
            <Menu.Button
              className={cn(
                'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading xl:px-4'
              )}
            >
              {({ open }) => (
                <>
                  <span className="whitespace-nowrap text-sm">Wines</span>
                  <span className="flex ltr:pl-2.5 rtl:pr-2.5 pt-1 ltr:ml-auto rtl:mr-auto">
                      <ArrowDownIcon
                        className={cn('h-3 w-3', {
                          'transform rotate-180': open,
                        })}
                      />
                  </span>
                </>
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="ul"
                className={cn(
                  'absolute py-2 z-100 w-38 h-56 lg:h-72 2xl:h-auto min-h-40 max-h-56 sm:max-h-72 2xl:max-h-screen bg-light rounded shadow-700 focus:outline-none overflow-hidden'
                )}
              >
                <Scrollbar
                  className="w-full h-full"
                  options={{
                    scrollbars: {
                      autoHide: 'never',
                    },
                  }}
                >
                    <Menu.Item key={1}>
                      {({ active }) => (
                        <Link
                          href='grocery/search?category=sparkling-wine'
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                            active ? 'text-accent' : 'text-body-dark'
                          )}
                        >
                          <span>Sparkling wine</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item key={2}>
                      {({ active }) => (
                        <Link
                          href='grocery/search?category=sparkling-wine'
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                            active ? 'text-accent' : 'text-body-dark'
                          )}
                        >
                          <span>Red wine</span>
                        </Link>
                      )}
                    </Menu.Item>
                </Scrollbar>
              </Menu.Items>
            </Transition>
          </Menu>
          <Menu
            as="div"
            className="relative inline-block ltr:text-left rtl:text-right z-10"
          >
            <Menu.Button
              className={cn(
                'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading xl:px-4'
              )}
            >
              {({ open }) => (
                <>
                  <span className="whitespace-nowrap text-sm">Non-alcoholic</span>
                  <span className="flex ltr:pl-2.5 rtl:pr-2.5 pt-1 ltr:ml-auto rtl:mr-auto">
                      <ArrowDownIcon
                        className={cn('h-3 w-3', {
                          'transform rotate-180': open,
                        })}
                      />
                  </span>
                </>
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="ul"
                className={cn(
                  'absolute py-2 z-100 w-40 h-56 lg:h-72 2xl:h-auto min-h-40 max-h-56 sm:max-h-72 2xl:max-h-screen bg-light rounded shadow-700 focus:outline-none overflow-hidden'
                )}
              >
                <Scrollbar
                  className="w-full h-full"
                  options={{
                    scrollbars: {
                      autoHide: 'never',
                    },
                  }}
                >
                    <Menu.Item key={1}>
                      {({ active }) => (
                        <Link
                          href='grocery/search?category=sparkling-wine'
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                            active ? 'text-accent' : 'text-body-dark'
                          )}
                        >
                          <span>Soft drinks</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item key={2}>
                      {({ active }) => (
                        <Link
                          href='grocery/search?category=sparkling-wine'
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                            active ? 'text-accent' : 'text-body-dark'
                          )}
                        >
                          <span>Fruit Juice</span>
                        </Link>
                      )}
                    </Menu.Item>
                </Scrollbar>
              </Menu.Items>
            </Transition>
          </Menu>
          {isDesktopOrLaptop &&
            <Link
              href='/offers'
              className='flex items-center px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none'
            >
              <span className="text-sm">Offers</span>
            </Link>
          }
          {isDesktopOrLaptop &&
            <Link
              href='/'
              className='flex space-x-4 rtl:space-x-reverse items-center px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none'
            >
              <span className="text-sm">About Us</span>
            </Link>
          }
          {isDesktopOrLaptop &&
            <Link
              href='/contact'
              className='flex space-x-4 rtl:space-x-reverse items-center px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none'
            >
              <span className="text-sm">Contact Us</span>
            </Link>
          }
      </div>
    </div>
  );
};

export default Header;
