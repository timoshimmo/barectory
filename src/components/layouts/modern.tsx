import Banner from '@/components/banners/banner';
import Categories from '@/components/categories/categories';
import { Menu, Transition } from '@headlessui/react';
import cn from 'classnames';
import { Element } from 'react-scroll';
import ProductGridHome from '@/components/products/grids/home';
import FilterBar from './filter-bar';
import type { HomePageProps } from '@/types';
import PopularProductsGrid from '@/components/products/popular-products';
import Link from '@/components/ui/link';
import Footer from './footer';
import MixersDropdownMenu from './menu/spirit-mixers-menu';
import { Fragment } from 'react';
import Scrollbar from '@/components/ui/scrollbar';
import { ArrowDownIcon } from '@/components/icons/arrow-down';

export default function Modern({ variables }: HomePageProps) {
  return (
    <div className="flex flex-1 bg-gray-100">
      {/*<div className="sticky top-22 hidden h-full bg-gray-100 lg:w-[380px] xl:block">
        <Categories layout="modern" variables={variables.categories} />
      </div> */}
      <main className="block w-full lg:mt-6 xl:overflow-hidden ltr:xl:pl-0 ltr:xl:pr-0 rtl:xl:pr-0 rtl:xl:pl-0">
      <div className="px-5 mb-4" style={{ display: 'flex'}}>
          <Menu
            as="div"
            className="relative inline-block ltr:text-left rtl:text-right"
          >
            <Menu.Button
              className={cn(
                'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading xl:px-4'
              )}
            >
              {({ open }) => (
                <>
                  <span className="whitespace-nowrap">Spirit & Mixers</span>
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
                  'absolute zindex-100 py-2 w-48 h-56 lg:h-72 2xl:h-auto min-h-40 max-h-56 sm:max-h-72 2xl:max-h-screen bg-light rounded shadow-700 focus:outline-none overflow-hidden'
                )}
                style={{zIndex: '100'}}
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
                          <span>Vermouth</span>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item key={2}>
                      {({ active }) => (
                        <Link
                          href='/whisky'
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
                          href='grocery/search?category=vodka'
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
            className="relative inline-block ltr:text-left rtl:text-right"
          >
            <Menu.Button
              className={cn(
                'flex items-center shrink-0 text-sm md:text-base font-semibold h-11 focus:outline-none text-heading xl:px-4'
              )}
            >
              {({ open }) => (
                <>
                  <span className="whitespace-nowrap">Wines</span>
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
                  'absolute zindex-100 py-2 w-48 h-56 lg:h-72 2xl:h-auto min-h-40 max-h-56 sm:max-h-72 2xl:max-h-screen bg-light rounded shadow-700 focus:outline-none overflow-hidden'
                )}
                style={{zIndex: '100'}}
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
                          href='/red-wine'
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
          <Link
            href='/offers'
            className='flex items-center px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none'
          >
            <span>Offers</span>
          </Link>

          <Link
            href='/'
            className='flex space-x-4 rtl:space-x-reverse items-center px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none'
          >
            <span>About Us</span>
          </Link>

          <Link
            href='/contact'
            className='flex space-x-4 rtl:space-x-reverse items-center px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none'
          >
            <span>Contact Us</span>
          </Link>
      </div>
        <div className="border border-border-200 mb-5">
          <Banner layout="modern" variables={variables.types} />
        </div>
        {/* <FilterBar variables={variables.categories} />  */}
        <Categories layout="modern" variables={variables.categories} />
        <div className="mt-5" style={{marginTop: 2 + 'em'}}>
          <PopularProductsGrid variables={variables.popularProducts} />
        </div>
        {/*
          <Element name="slider" className="px-4 xl:px-0">
          <ProductGridHome className="py-6" variables={variables.products} />
        </Element>
          */}
          <Footer />
      </main>
    </div>
  );
}
