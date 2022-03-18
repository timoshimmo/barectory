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
import { modal } from '@/components/ui/modal/modal';

export default function Modern({ variables }: HomePageProps) {

  function handleProductQuickView() {
    return modal(true);
  }

  return (
    <div className="flex flex-1 bg-gray-100">
      {/*<div className="sticky top-22 hidden h-full bg-gray-100 lg:w-[380px] xl:block">
        <Categories layout="modern" variables={variables.categories} />
      </div> */}
      <main className="block w-full lg:mt-6 xl:overflow-hidden ltr:xl:pl-0 ltr:xl:pr-0 rtl:xl:pr-0 rtl:xl:pl-0">
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
