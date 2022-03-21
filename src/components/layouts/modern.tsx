import React, { useEffect, useState, Fragment, useRef } from 'react'
import Banner from '@/components/banners/banner';
import Categories from '@/components/categories/categories';
import { Menu, Transition, Dialog } from '@headlessui/react';
import cn from 'classnames';
import { Element } from 'react-scroll';
import ProductGridHome from '@/components/products/grids/home';
import FilterBar from './filter-bar';
import type { HomePageProps } from '@/types';
import PopularProductsGrid from '@/components/products/popular-products';
import SellingProductsGrid from '@/components/products/selling-products';
import Link from '@/components/ui/link';
import Button from '@/components/ui/button';
import Footer from './footer';
import MixersDropdownMenu from './menu/spirit-mixers-menu';
import Scrollbar from '@/components/ui/scrollbar';
import { ArrowDownIcon } from '@/components/icons/arrow-down';
import { modal } from '@/components/ui/modal/modal';
import { CloseIcon } from '@/components/icons/close-icon';
import { useTranslation } from 'next-i18next';
import { Image } from '@/components/ui/image';
import { logoPlaceholder } from '@/lib/placeholders';
import { useLocalStorage } from '@/lib/use-local-storage';
import Head from 'next/head';

export default function Modern({ variables }: HomePageProps) {

  const [open, setOpen] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Select City');
  const [lAge, setlAge] = useState('DEFAULT');
//  const cancelButtonRef = useRef(null);
  const { t } = useTranslation('common');

  useEffect(() => {
    localStorage.setItem("legalAge", 'DEFAULT');
    setlAge(window.localStorage.getItem("legalAge"));
    console.log(lAge);

  },[lAge]);

  const onClose =()=> {
    setOpen(false);
  }

  const handleSelectCity =(cityName)=> {
    setSelectedCity(cityName);
  }

  const handleNotLegal =()=> {
    if (typeof window !== "undefined") {
      localStorage.setItem("legalAge", "ILLEGAL");
    }
    onClose();
  }

  const handleLegal =()=> {
    if (typeof window !== "undefined") {
         localStorage.setItem("legalAge", "LEGAL");
    }
    onClose();
  }
/*  useEffect(() => {
        handleProductQuickView();
    }) */

  return (
    <div className="flex flex-1 bg-gray-100">
      {/*<div className="sticky top-22 hidden h-full bg-gray-100 lg:w-[380px] xl:block">
        <Categories layout="modern" variables={variables.categories} />
      </div> */}
      <main className="block w-full lg:mt-6 xl:overflow-hidden ltr:xl:pl-0 ltr:xl:pr-0 rtl:xl:pr-0 rtl:xl:pl-0">
      {lAge !== "LEGAL" &&
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
                <div className="product-card cart-type-krypton py-6 px-8 rounded border border-border-200 bg-light inline-block min-w-content max-w-80 sm:p-8 align-middle transition-all relative">
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
                        <h1 className=" heading mt-4 text-accent font-bold text-lg">Welcome To Barectory</h1>
                        <p className=" heading mt-4 text-sm text-body-dark">
                          You must be of legal drinking age (18+) in the country to access this site
                        </p>
                      </div>
                    </div>
                    <div className=" modal-body flex justify-center">
                       <div className=" pb-3 text-center">
                         <p className=" heading mt-4 text-sm text-body-dark mb-2">
                           We currently only make deliveries to the listed cities below
                         </p>
                         <Menu
                           as="div"
                           className="relative inline-block ltr:text-left rtl:text-right w-100"
                         >
                           <Menu.Button
                              style={{ width: 200 + 'px' }}
                             className={cn(
                               'flex items-center shrink-0 text-sm md:text-base h-10 w-100 focus:outline-none text-body xl:px-4 border border-border-200 rounded-lg'
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
                                 'absolute zindex-100 py-2 w-48 h-56 lg:h-60 2xl:h-auto min-h-40 max-h-56 sm:max-h-56 2xl:max-h-screen bg-light rounded shadow-700 focus:outline-none overflow-hidden'
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
                                   <Menu.Item key={3}>
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
                                   <Menu.Item key={4}>
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
                     <div className=" modal-body flex justify-center">
                        <div className=" pb-1 text-center">
                          <h2 className=" heading mt-4 text-body-dark font-bold text-lg">Are you of legal drinking age?</h2>
                        </div>
                    </div>
                    <div className=" modal-body flex justify-center">
                      <div className="flex justify-center px-2">
                        <Button
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-1 mr-1 text-sm font-semibold capitalize transition duration-200 hover:text-light focus:outline-none'
                          )}
                          onClick={handleLegal}
                          size="small"
                        >
                          <span>Yes</span>
                        </Button>
                        <Button
                          className={cn(
                            'flex space-x-4 rtl:space-x-reverse items-center w-full px-5 py-1 ml-1 text-sm font-semibold capitalize transition duration-200 hover:text-light focus:outline-none'
                          )}
                          onClick={handleNotLegal}
                          size="small"
                        >
                          <span>No</span>
                        </Button>
                      </div>
                    </div>
                    <div className=" modal-footer mt-5">
                      <button className=" btn-white text-accent text-sm">
                        Continue Browsing
                      </button>
                    </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

      }
        <div className="border border-border-200 mb-5">
          <Banner layout="modern" variables={variables.types} />
        </div>
        {/* <FilterBar variables={variables.categories} />  */}
        <Categories layout="modern" variables={variables.categories} />
        <div className="mt-5" style={{marginTop: 2.2 + 'em'}}>
          <PopularProductsGrid variables={variables.popularProducts} />
        </div>
        <div className="mt-5" style={{marginTop: 2.2 + 'em'}}>
          <SellingProductsGrid variables={variables.popularProducts} />
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
