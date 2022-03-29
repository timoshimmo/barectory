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
import { useCart } from '@/store/quick-cart/cart.context';
import { useRouter } from 'next/router';
import { ROUTES } from '@/lib/routes';
const AuthorizedMenu = dynamic(() => import('./menu/authorized-menu'), {
  ssr: false,
});
/*const CartCounterIconButton = dynamic(
  () => import('@/components/cart/cart-counter-icon-button'),
  { ssr: false }
); */
import { CartOutlinedIcon } from '@/components/icons/cart-outlined';
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
  const { totalUniqueItems } = useCart();
  const router = useRouter();
  const [isShowingBeer, setIsShowingBeer] = useState(false);
  const [isShowingSpirits, setIsShowingSpirits] = useState(false);
  const [isShowingWines, setIsShowingWines] = useState(false);
  const [isShowingRDrink, setIsShowingRDrink] = useState(false);
  const [isShowingNonAlcohol, setIsShowingNonAlcohol] = useState(false);
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

    function handleCart() {
      router.push(ROUTES.CART);
    }

    const onMouseEnterBeerButton = () => {
       setIsShowingBeer(true);
    }

    const onMouseLeaveBeerButton = () => {
      setIsShowingBeer(false);
     }

     const onMouseEnterSpiritsButton = () => {
        setIsShowingSpirits(true);
     }

     const onMouseLeaveSpiritsButton = () => {
       setIsShowingSpirits(false);
      }

      const onMouseEnterWinesButton = () => {
         setIsShowingWines(true);
      }

      const onMouseLeaveWinesButton = () => {
        setIsShowingWines(false);
       }

     const onMouseEnterRdyDrinkButton = () => {
        setIsShowingRDrink(true);
     }

     const onMouseLeaveRdyDrinkButton = () => {
       setIsShowingRDrink(false);
      }

      const onMouseEnterNonAlcoholicButton = () => {
         setIsShowingNonAlcohol(true);
      }

      const onMouseLeaveNonAlcoholicButton = () => {
        setIsShowingNonAlcohol(false);
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
            <button
              className="hidden product-cart lg:flex relative"
              onClick={handleCart}
            >
              <CartOutlinedIcon className="w-5 h-5 text-light" />
              {totalUniqueItems > 0 && (
                <span className="min-w-[20px] h-5 flex items-center justify-center rounded-full bg-light text-primary text-[10px] absolute ltr:-right-1/2 rtl:-left-1/2 -top-1/2">
                  {totalUniqueItems}
                </span>
              )}
            </button>
            {/*
              <CartCounterIconButton />
            */}
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
            <>
              <Menu.Button
                className={cn(
                  'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading xl:px-4 hover:text-accent'
                )}
                onMouseEnter={onMouseEnterBeerButton}
                onMouseLeave={onMouseLeaveBeerButton}
              >
                <span className="whitespace-nowrap text-xs">BEER</span>
              </Menu.Button>
              <Transition
                as={Fragment}
                show={isShowingBeer}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  as="ul"
                  className={cn(
                    'absolute py-2 z-100 w-40 h-auto bg-light rounded shadow-700 focus:outline-none overflow-hidden'
                  )}
                  onMouseEnter={onMouseEnterBeerButton}
                  onMouseLeave={onMouseLeaveBeerButton}
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
                            <span className="whitespace-nowrap text-xs">Ale</span>
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
                            <span className="whitespace-nowrap text-xs">Lager</span>
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
                            <span className="whitespace-nowrap text-xs">Stout</span>
                          </Link>
                        )}
                      </Menu.Item>
                  </Scrollbar>
                </Menu.Items>
              </Transition>
            </>
          </Menu>
          <Menu
            as="div"
            className="relative inline-block ltr:text-left rtl:text-right z-10"
          >
            <>
              <Menu.Button
                className={cn(
                  'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading xl:px-4 mr-1 hover:text-accent'
                )}
                onMouseEnter={onMouseEnterSpiritsButton}
                onMouseLeave={onMouseLeaveSpiritsButton}
              >
                <span className="whitespace-nowrap text-xs">SPIRITS</span>
              </Menu.Button>
              <Transition
                as={Fragment}
                show={isShowingSpirits}
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
                    'absolute py-2 z-100 w-40 h-auto bg-light rounded shadow-700 focus:outline-none overflow-hidden'
                  )}
                  onMouseEnter={onMouseEnterSpiritsButton}
                  onMouseLeave={onMouseLeaveSpiritsButton}
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
                            <span className="whitespace-nowrap text-xs">Vermouth</span>
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
                            <span className="whitespace-nowrap text-xs">Whisky</span>
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
                            <span className="whitespace-nowrap text-xs">Vodka</span>
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
                            <span className="whitespace-nowrap text-xs">Gin</span>
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
                            <span className="whitespace-nowrap text-xs">Rum</span>
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
                            <span className="whitespace-nowrap text-xs">Tequila</span>
                          </Link>
                        )}
                      </Menu.Item>
                  </Scrollbar>
                </Menu.Items>
              </Transition>
            </>
          </Menu>
          <Menu
            as="div"
            className="relative inline-block ltr:text-left rtl:text-right z-10"
          >
            <>
              <Menu.Button
                className={cn(
                  'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading xl:px-4 hover:text-accent'
                )}
                onMouseEnter={onMouseEnterWinesButton}
                onMouseLeave={onMouseLeaveWinesButton}
              >
                <span className="whitespace-nowrap text-xs">WINES</span>
              </Menu.Button>
              <Transition
                as={Fragment}
                show={isShowingWines}
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
                    'absolute py-2 z-100 w-40 h-auto bg-light rounded shadow-700 focus:outline-none overflow-hidden'
                  )}
                  onMouseEnter={onMouseEnterWinesButton}
                  onMouseLeave={onMouseLeaveWinesButton}
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
                            <span className="whitespace-nowrap text-xs">Sparkling wine</span>
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
                            <span className="whitespace-nowrap text-xs">Red wine</span>
                          </Link>
                        )}
                      </Menu.Item>
                  </Scrollbar>
                </Menu.Items>
              </Transition>
            </>
          </Menu>
          <Menu
            as="div"
            className="relative inline-block ltr:text-left rtl:text-right z-10"
          >
            <>
              <Menu.Button
                className={cn(
                  'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading xl:px-4 hover:text-accent'
                )}
                onMouseEnter={onMouseEnterRdyDrinkButton}
                onMouseLeave={onMouseLeaveRdyDrinkButton}
              >
                <span className="whitespace-nowrap text-xs">READY TO DRINK</span>
              </Menu.Button>
              <Transition
                as={Fragment}
                show={isShowingRDrink}
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
                    'absolute py-2 z-100 w-40 h-auto bg-light rounded shadow-700 focus:outline-none overflow-hidden'
                  )}
                  onMouseEnter={onMouseEnterRdyDrinkButton}
                  onMouseLeave={onMouseLeaveRdyDrinkButton}
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
                            <span className="whitespace-nowrap text-xs">Smirnoff Ice</span>
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
                            <span className="whitespace-nowrap text-xs">Origin</span>
                          </Link>
                        )}
                      </Menu.Item>
                  </Scrollbar>
                </Menu.Items>
              </Transition>
            </>
          </Menu>
          <Menu
            as="div"
            className="relative inline-block ltr:text-left rtl:text-right z-10"
          >
            <>
              <Menu.Button
                className={cn(
                  'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading xl:px-4 hover:text-accent'
                )}
                onMouseEnter={onMouseEnterNonAlcoholicButton}
                onMouseLeave={onMouseLeaveNonAlcoholicButton}
              >
                <span className="whitespace-nowrap text-xs">NON-ALCOHOLIC</span>
              </Menu.Button>
              <Transition
                as={Fragment}
                show={isShowingNonAlcohol}
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
                    'absolute py-2 z-100 w-40 h-auto bg-light rounded shadow-700 focus:outline-none overflow-hidden'
                  )}
                  onMouseEnter={onMouseEnterNonAlcoholicButton}
                  onMouseLeave={onMouseLeaveNonAlcoholicButton}
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
                            <span className="whitespace-nowrap text-xs">Soft drinks</span>
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
                            <span className="whitespace-nowrap text-xs">Fruit Juice</span>
                          </Link>
                        )}
                      </Menu.Item>
                  </Scrollbar>
                </Menu.Items>
              </Transition>
            </>
          </Menu>
          <Link
            href='/offers'
            className='flex items-center px-5 py-2.5 text-gray-700 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none'
          >
            <span className="text-xs">OFFERS</span>
          </Link>
          <Link
            href='/contact'
            className='flex space-x-4 text-gray-700 items-center px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none'
          >
            <span className="text-xs">CONTACT US</span>
          </Link>
          <Menu
            as="div"
            className="relative inline-block ltr:text-left rtl:text-right z-10"
          >
            {({open}) => (
              <>
                <Menu.Button
                  className={cn(
                    'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading xl:px-4 hover:text-accent'
                  )}
                >
                  <span className="whitespace-nowrap text-xs">MORE</span>
                  <span className="flex ltr:pl-2.5 rtl:pr-2.5 ltr:ml-auto rtl:mr-auto">
                      <ArrowDownIcon
                        className={cn('h-2 w-2', {
                          'transform rotate-180': open,
                        })}
                      />
                  </span>
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
                    static
                    as="ul"
                    className={cn(
                      'absolute py-2 z-100 w-40 h-auto bg-light rounded shadow-700 focus:outline-none overflow-hidden'
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
                              <span className="whitespace-nowrap text-xs">About Us</span>
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
                              <span className="whitespace-nowrap text-xs">Blog</span>
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
                              <span className="whitespace-nowrap text-xs">Events</span>
                            </Link>
                          )}
                        </Menu.Item>
                    </Scrollbar>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
      </div>
    </div>
  );
};

export default Header;
