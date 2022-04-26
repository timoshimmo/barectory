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
import { Menu, Transition, Dialog } from '@headlessui/react';
import Scrollbar from '@/components/ui/scrollbar';
import { Image } from '@/components/ui/image';
import { logoPlaceholder } from '@/lib/placeholders';
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
import { UserOutlinedIcon } from '@/components/icons/user-outlined';
/*const CartCounterIconButton = dynamic(
  () => import('@/components/cart/cart-counter-icon-button'),
  { ssr: false }
); */
import { CartOutlinedIcon } from '@/components/icons/cart-outlined';
import { MapPin } from '@/components/icons/map-pin';
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
  const [isShowingMore, setIsShowingMore] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    //localStorage.setItem("cityName", "Ikoyi");
    setSelectedCity(window.localStorage.getItem("cityName"));
}, []);
  const isFlattenHeader =
    !displayHeaderSearch && isHomePage && layout !== 'modern';

    function handleJoin() {
      return openModal('LOGIN_VIEW');
    }

    function handleCart() {
      router.push(ROUTES.CART);
    }

    const onMouseEnterMore = () => {
       setIsShowingMore(true);
    }

    const onMouseLeaveMore = () => {
      setIsShowingMore(false);
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

       const onOpen =()=> {
         setOpen(true);
       }

       const onClose =()=> {
         setOpen(false);
       }

       const handleSelectCity =(cityName)=> {
         setSelectedCity(cityName);
       }


       const handleLegal =()=> {
         if(selectedCity !== "") {

           if(selectedCity.toLowerCase() === "ikoyi" || selectedCity.toLowerCase() === "lekki" ||
           selectedCity.toLowerCase() === "victoria island" || selectedCity.toLowerCase() === "surulere" ||
           selectedCity.toLowerCase() === "ikeja") {
             console.log("City found! " + selectedCity);
             if (typeof window !== "undefined") {
               localStorage.setItem("cityStatus", 'FOUND');
               localStorage.setItem("cityName", selectedCity);
             }
             onClose();
             window.location.reload(true);

           }
         }
       }

       function handleBeer() {
         router.push('grocery/search?category=beer');
       }

       function handleSpirits() {
         router.push('grocery/search?category=spirits');
       }

       function handleWines() {
         router.push('grocery/search?category=wines');
       }

       function handleReadyToDrink() {
         router.push('grocery/search?category=ready-todrink');
       }

       function handleNonAlcoholic() {
         router.push('grocery/search?category=non-alcoholic');
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
    <div className="fixed w-full z-50 bg-gray-100 border-b border-border-200 shadow-sm">
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

          <div className="w-full px-10 py-3 mx-auto lg:block">
            <SearchWithSuggestion label={t('text-search-label')} variant="minimal" />
          </div>

          <ul className="items-center shrink-0 hidden lg:flex space-x-12">
            <button
              className="hidden product-cart lg:flex relative hover:text-underline flex items-center justify-start border border-light rounded px-2 py-2"
              onClick={onOpen}
            >
              <MapPin className="w-5 h-5 text-light" />
              <span className="text-xs h-5 flex max-w-[150px] item-center py-1 text-light ml-1">
                CHANGE LOCATION
                </span>
            </button>
            <div className="flex items-center space-x-4">
              {isAuthorize ?
                <AuthorizedMenu minimal={true} />
                :
                <button
                  className="hidden product-cart lg:flex relative"
                  onClick={handleJoin}
                >
                  <UserOutlinedIcon className="w-5 h-5 text-light" />
                </button>
                }
            </div>
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

              <Button className="font-semibold" size="small" onClick={handleJoin}>
                Login
              </Button>

              <JoinButton />
            */}
          </ul>
        </div>
      </header>
      <div className="px-5 flex w-full h-full justify-center items-center relative">
          <Menu
            as="div"
            className="relative inline-block z-10 px-8"
            onClick={handleBeer}
          >
            <>
              <Menu.Button
                className={cn(
                  'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading hover:text-accent'
                )}
                onMouseEnter={onMouseEnterBeerButton}
                onMouseLeave={onMouseLeaveBeerButton}
              >
                <span className="whitespace-nowrap text-sm text-body-dark font-bold text-heading hover:text-accent">BEER</span>
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
                              'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold text-body-dark capitalize transition duration-200 hover:text-accent focus:outline-none',
                              active ? 'text-accent' : 'text-body-dark'
                            )}
                          >
                            <span className="whitespace-nowrap text-sm">Ale</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item key={2}>
                        {({ active }) => (
                          <Link
                            href='grocery/search?category=sparkling-wine'
                            className={cn(
                              'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm text-body-dark font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                              active ? 'text-accent' : 'text-body-dark'
                            )}
                          >
                            <span className="whitespace-nowrap text-sm">Lager</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item key={3}>
                        {({ active }) => (
                          <Link
                            href='grocery/search?category=sparkling-wine'
                            className={cn(
                              'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm text-body-dark font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                              active ? 'text-accent' : 'text-body-dark'
                            )}
                          >
                            <span className="whitespace-nowrap text-sm">Stout</span>
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
            className="relative  inline-block ltr:text-left rtl:text-right z-10 px-8"
            onClick={handleSpirits}
          >
            <>
              <Menu.Button
                className={cn(
                  'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading hover:text-accent'
                )}
                onMouseEnter={onMouseEnterSpiritsButton}
                onMouseLeave={onMouseLeaveSpiritsButton}
              >
                <span className="whitespace-nowrap text-sm text-body-dark font-bold text-heading hover:text-accent">SPIRITS</span>
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
                              'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm text-body-dark font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                              active ? 'text-accent' : 'text-body-dark'
                            )}
                          >
                            <span className="whitespace-nowrap text-sm">Vermouth</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item key={2}>
                        {({ active }) => (
                          <Link
                            href='/grocery/search?category=whisky'
                            className={cn(
                              'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm text-body-dark font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                              active ? 'text-accent' : 'text-body-dark'
                            )}
                          >
                            <span className="whitespace-nowrap text-sm">Whisky</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item key={3}>
                        {({ active }) => (
                          <Link
                            href='/grocery/search?category=vodka'
                            className={cn(
                              'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm text-body-dark font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                              active ? 'text-accent' : 'text-body-dark'
                            )}
                          >
                            <span className="whitespace-nowrap text-sm">Vodka</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item key={4}>
                        {({ active }) => (
                          <Link
                            href='grocery/search?category=gin'
                            className={cn(
                              'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm text-body-dark font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                              active ? 'text-accent' : 'text-body-dark'
                            )}
                          >
                            <span className="whitespace-nowrap text-sm">Gin</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item key={5}>
                        {({ active }) => (
                          <Link
                            href='grocery/search?category=rum'
                            className={cn(
                              'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold text-body-dark capitalize transition duration-200 hover:text-accent focus:outline-none',
                              active ? 'text-accent' : 'text-body-dark'
                            )}
                          >
                            <span className="whitespace-nowrap text-sm">Rum</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item key={6}>
                        {({ active }) => (
                          <Link
                            href='grocery/search?category=tequila'
                            className={cn(
                              'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm font-semibold text-body-dark capitalize transition duration-200 hover:text-accent focus:outline-none',
                              active ? 'text-accent' : 'text-body-dark'
                            )}
                          >
                            <span className="whitespace-nowrap text-sm">Tequila</span>
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
            className="relative  inline-block ltr:text-left rtl:text-right z-10 px-8"
            onClick={handleWines}
          >
            <>
              <Menu.Button
                className={cn(
                  'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading hover:text-accent'
                )}
                onMouseEnter={onMouseEnterWinesButton}
                onMouseLeave={onMouseLeaveWinesButton}
              >
                <span className="whitespace-nowrap text-sm text-body-dark font-bold text-heading hover:text-accent">WINES</span>
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
                              'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm text-body-dark font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                              active ? 'text-accent' : 'text-body-dark'
                            )}
                          >
                            <span className="whitespace-nowrap text-sm">Sparkling Wine</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item key={2}>
                        {({ active }) => (
                          <Link
                            href='grocery/search?category=sparkling-wine'
                            className={cn(
                              'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm text-body-dark font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                              active ? 'text-accent' : 'text-body-dark'
                            )}
                          >
                            <span className="whitespace-nowrap text-sm">Red Wine</span>
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
            className="relative  inline-block ltr:text-left rtl:text-right z-10 px-8"
            onClick={handleReadyToDrink}
          >
            <>
              <Menu.Button
                className={cn(
                  'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading hover:text-accent'
                )}
                onMouseEnter={onMouseEnterRdyDrinkButton}
                onMouseLeave={onMouseLeaveRdyDrinkButton}
              >
                <span className="whitespace-nowrap text-sm text-body-dark font-bold text-heading hover:text-accent">READY TO DRINK</span>
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
                              'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm text-body-dark font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                              active ? 'text-accent' : 'text-body-dark'
                            )}
                          >
                            <span className="whitespace-nowrap text-sm">Smirnoff Ice</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item key={2}>
                        {({ active }) => (
                          <Link
                            href='grocery/search?category=vermouth'
                            className={cn(
                              'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm text-body-dark font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                              active ? 'text-accent' : 'text-body-dark'
                            )}
                          >
                            <span className="whitespace-nowrap text-sm">Origin</span>
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
            className="relative  inline-block ltr:text-left rtl:text-right z-10 px-8"
            onClick={handleNonAlcoholic}
          >
            <>
              <Menu.Button
                className={cn(
                  'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading hover:text-accent'
                )}
                onMouseEnter={onMouseEnterNonAlcoholicButton}
                onMouseLeave={onMouseLeaveNonAlcoholicButton}
              >
                <span className="whitespace-nowrap text-sm text-body-dark font-bold text-heading hover:text-accent">NON-ALCOHOLIC</span>
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
                              'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm text-body-dark font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                              active ? 'text-accent' : 'text-body-dark'
                            )}
                          >
                            <span className="whitespace-nowrap text-sm">Soft Drinks</span>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item key={2}>
                        {({ active }) => (
                          <Link
                            href='grocery/search?category=sparkling-wine'
                            className={cn(
                              'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-2.5 text-sm text-body-dark font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                              active ? 'text-accent' : 'text-body-dark'
                            )}
                          >
                            <span className="whitespace-nowrap text-sm">Fruit Juice</span>
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
            className='flex items-center  px-8 mr-0 py-2.5 text-gray-700 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none'
          >
            <span className="text-sm text-body-dark font-bold text-heading hover:text-accent">OFFERS</span>
          </Link>
          <Link
            href='/'
            className='flex text-gray-700  items-center px-8 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none'
          >
            <span className="text-sm text-body-dark font-bold text-heading hover:text-accent">EVENTS</span>
          </Link>
          <Menu
            as="div"
            className="relative  inline-block ltr:text-left rtl:text-right z-10 px-8"
            onMouseEnter={onMouseEnterMore}
            onMouseLeave={onMouseLeaveMore}
          >
              <>
                <Menu.Button
                  className={cn(
                    'flex items-center shrink-0 text-sm md:text-base font-bold text-body-dark h-11 focus:outline-none text-heading hover:text-accent'
                  )}
                >
                  <span className="whitespace-nowrap text-sm font-bold text-heading hover:text-accent">MORE</span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  show={isShowingMore}
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
                    onMouseEnter={onMouseEnterMore}
                    onMouseLeave={onMouseLeaveMore}
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
                              <span className="whitespace-nowrap text-sm">About Us</span>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item key={2}>
                          {({ active }) => (
                            <Link
                              href='grocery/search?category=sparkling-wine'
                              className={cn(
                                'flex space-x-4 items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                                active ? 'text-accent' : 'text-body-dark'
                              )}
                            >
                              <span className="whitespace-nowrap text-sm">Blog</span>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item key={3}>
                          {({ active }) => (
                            <Link
                              href='/contact'
                              className={cn(
                                'flex space-x-4 items-center w-full px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none',
                                active ? 'text-accent' : 'text-body-dark'
                              )}
                            >
                              <span className="whitespace-nowrap text-sm">Contact Us</span>
                            </Link>
                          )}
                        </Menu.Item>
                    </Scrollbar>
                  </Menu.Items>
                </Transition>
              </>
          </Menu>
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          static
          open={open}
          onClose={() => {}}
        >
          <div className="max-h-90 w-90 md:p-5 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-50 w-90 h-90" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="product-card cart-type-krypton py-6 px-8 rounded border border-border-200 bg-accent inline-block min-w-content max-w-80 sm:p-8 align-middle transition-all relative">
                <div className=" modal-header flex justify-center">
                  <span className="relative h-10 w-32 overflow-hidden md:w-40">
                    <Image
                      src={logoPlaceholder}
                      alt={'Barectory'}
                      layout="fill"
                      objectFit="contain"
                      loading="eager"
                    />
                  </span>
                 </div>
                 <div className=" modal-body flex justify-center">
                    <div className=" py-3 text-center">
                      <h1 className="heading mt-4 text-accent font-bold text-lg text-light" style={{ fontWeight: 800, fontSize: "1.5rem" }}><strong>Update Location</strong></h1>
                    </div>
                  </div>
                  <div className=" modal-body flex flex-col justify-center">
                    <p className=" heading mt-4 text-sm text-light text-light">
                      Barectory is currently not available in selected areas.
                    </p>
                    <p className=" heading mb-5 text-sm text-light text-light">
                      Update to our one of service areas to purchase any of our products.
                    </p>
                 </div>
                    <div className="w-full">
                    <div className=" modal-body flex justify-center">
                       <div className=" pb-3 text-center">

                         <Menu
                           as="div"
                           className="relative inline-block ltr:text-left rtl:text-right w-100"
                         >
                           <Menu.Button
                              style={{ width: 200 + 'px' }}
                             className={cn(
                               'flex items-center shrink-0 text-sm md:text-base bg-light h-10 w-100 focus:outline-none text-body xl:px-4 border border-border-200 rounded-lg'
                             )}

                           >
                             {({ open }) => (
                               <>
                                 <span className="whitespace-nowrap text-sm pl-2">{selectedCity}</span>
                                 <span className="flex ltr:pr-2.5 rtl:pr-2.5 ltr:ml-auto rtl:mr-auto">
                                     <ArrowDownIcon
                                       className={cn('h-2 w-2', {
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
                                 'absolute py-2 w-48 h-56 lg:h-60 2xl:h-auto min-h-40 max-h-56 sm:max-h-56 2xl:max-h-screen bg-light rounded shadow-700 focus:outline-none overflow-hidden'
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
                                       <button
                                         onClick={() => handleSelectCity('Ikoyi')}
                                         className={cn(
                                           'inline-flex items-center w-full text-accent text-sm font-semibold transition-colors hover:text-accent-hover focus:text-accent-hover focus:outline-none px-5 py-2 hover:bg-gray-200',
                                           active ? 'text-accent' : 'text-body-dark'
                                         )}
                                       >
                                         <span>Ikoyi</span>
                                       </button>
                                     )}
                                   </Menu.Item>
                                   <Menu.Item key={2}>
                                     {({ active }) => (
                                       <button
                                         onClick={() => handleSelectCity('Ikeja')}
                                         className={cn(
                                           'inline-flex items-center w-full text-accent text-sm font-semibold transition-colors hover:text-accent-hover focus:text-accent-hover focus:outline-none px-5 py-2 hover:bg-gray-200',
                                           active ? 'text-accent' : 'text-body-dark'
                                         )}
                                       >
                                         <span>Ikeja</span>
                                       </button>
                                     )}
                                   </Menu.Item>
                                   <Menu.Item key={3}>
                                     {({ active }) => (
                                       <button
                                         onClick={() => handleSelectCity('Lekki')}
                                         className={cn(
                                           'inline-flex items-center w-full text-accent text-sm font-semibold transition-colors hover:text-accent-hover focus:text-accent-hover focus:outline-none px-5 py-2 hover:bg-gray-200',
                                           active ? 'text-accent' : 'text-body-dark'
                                         )}
                                       >
                                         <span>Lekki</span>
                                       </button>
                                     )}
                                   </Menu.Item>
                                   <Menu.Item key={4}>
                                     {({ active }) => (
                                       <button
                                         onClick={() => handleSelectCity('Surulere')}
                                         className={cn(
                                           'inline-flex items-center w-full text-accent text-sm font-semibold transition-colors hover:text-accent-hover focus:text-accent-hover focus:outline-none px-5 py-2 hover:bg-gray-200',
                                           active ? 'text-accent' : 'text-body-dark'
                                         )}
                                       >
                                         <span>Surulere</span>
                                       </button>
                                     )}
                                   </Menu.Item>
                                   <Menu.Item key={5}>
                                     {({ active }) => (
                                       <button
                                         onClick={() => handleSelectCity('Victoria Island')}
                                         className={cn(
                                           'inline-flex items-center w-full text-sm text-accent font-semibold transition-colors hover:text-accent-hover focus:text-accent-hover focus:outline-none px-5 py-2 hover:bg-gray-200',
                                           active ? 'text-accent' : 'text-body-dark'
                                         )}
                                       >
                                         <span>Victoria Island</span>
                                       </button>
                                     )}
                                   </Menu.Item>
                               </Scrollbar>
                             </Menu.Items>
                           </Transition>
                         </Menu>
                       </div>
                     </div>
                    </div>
                  <div className=" modal-body flex justify-center">
                    <div className="flex justify-center px-2">
                      <button
                        className={cn(
                          'inline-flex items-center bg-light justify-center px-6 py-2 mr-1 shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none hover:bg-gray-200'
                        )}
                        onClick={handleLegal}
                        size="small"
                      >
                        <span className="text-accent">Confirm</span>
                      </button>
                      <button
                        className={cn(
                          'inline-flex items-center bg-light justify-center px-6 py-2 ml-1 shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none hover:bg-gray-200'
                        )}
                        onClick={onClose}
                        size="small"
                      >
                        <span className="text-accent">Cancel</span>
                      </button>
                    </div>
                  </div>
              {/*
                <div className=" modal-footer mt-5">
                      <button className=" btn-white text-accent text-sm">
                        Continue Browsing
                      </button>
                    </div>
              */}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Header;
