import React, { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import Banner from '@/components/banners/banner';
import Categories from '@/components/categories/categories';
import { Element } from 'react-scroll';
import ProductGridHome from '@/components/products/grids/home';
import FilterBar from './filter-bar';
import type { HomePageProps } from '@/types';
import PopularProductsGrid from '@/components/products/popular-products';
import SellingProductsGrid from '@/components/products/selling-products';
import SubscribePopup from '@/components/subscribe/popup';


export default function Modern({ variables }: HomePageProps) {

  return (
    <div className="flex flex-1 bg-gray-100">
      {/*<div className="sticky top-22 hidden h-full bg-gray-100 lg:w-[380px] xl:block">
        <Categories layout="modern" variables={variables.categories} />
      </div> */}
      <main className="main-container block w-full xl:overflow-hidden ltr:xl:pl-0 ltr:xl:pr-0 rtl:xl:pr-0 rtl:xl:pl-0">
        <SubscribePopup />
        <div className="border border-border-200 mb-5 z-0">
          <Banner layout="modern" variables={variables.types} />
        </div>
        {/* <FilterBar variables={variables.categories} />  */}
        <Categories layout="modern" variables={variables.categories} />
        <div className="mt-5" style={{marginTop: 2.2 + 'em'}}>
          <PopularProductsGrid variables={variables.popularProducts} />
        </div>
        <div className="mt-5" style={{marginTop: 2.2 + 'em'}}>
          <SellingProductsGrid variables={variables.products} />
        </div>

        {/*
          <Element name="slider" className="px-4 xl:px-0">
          <ProductGridHome className="py-6" variables={variables.products} />
        </Element>
          */}
      </main>
    </div>
  );
}
