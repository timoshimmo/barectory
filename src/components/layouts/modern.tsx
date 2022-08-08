import React, { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import Banner from '@/components/banners/banner';
import Categories from '@/components/categories/categories';
import CategoriesFirstHome from '@/components/categories/categories-first-home';
import CategoriesMiddleHome from '@/components/categories/categories-middle-home';
import CategoriesLastHome from '@/components/categories/categories-last-home';
import { Element } from 'react-scroll';
import ProductGridHome from '@/components/products/grids/home';
import FilterBar from './filter-bar';
import type { HomePageProps } from '@/types';
import PopularProductsGrid from '@/components/products/popular-products';
import SellingProductsGrid from '@/components/products/selling-products';
import SubscribePopup from '@/components/subscribe/popup';
import { Image } from '@/components/ui/image';
import { adsPlaceholder } from '@/lib/placeholders';
import Ads from '@/components/ui/ads-image';
import AdsFirst from '@/components/ads/ads-first';
import AdsSecond from '@/components/ads/ads-second';
import AdsThird from '@/components/ads/ads-third';


export default function Modern({ variables }: HomePageProps) {

  return (
    <div className="flex flex-1 bg-gray-100">
      {/*<div className="sticky top-22 hidden h-full bg-gray-100 lg:w-[380px] xl:block">
        <Categories layout="modern" variables={variables.categories} />
      </div> */}
      <main className="main-container block w-full mb-20 xl:overflow-hidden ltr:xl:pl-0 ltr:xl:pr-0 rtl:xl:pr-0 rtl:xl:pl-0">
        <SubscribePopup />
        <div className="border border-border-200 mb-5 z-0">
          <Banner layout="modern" variables={variables.types} />
        </div>
          {/* <FilterBar variables={variables.categories} />  */}
          <Categories layout="modern" variables={variables.categories} />
        <div className="mt-[30px]">
          <PopularProductsGrid variables={variables.popularProducts} />
        </div>
        <div className="mt-[30px]">
          <SellingProductsGrid variables={variables.products} />
        </div>
        <div className="mt-[30px] w-full">
          <AdsFirst layout="modern" variables={variables.types} />
        </div>
        <div>
            <CategoriesFirstHome variables={variables.categories}/>
        </div>
        <div className="mt-[30px] w-full">
          <AdsSecond layout="modern" variables={variables.types} />
        </div>
        <div>
          <CategoriesMiddleHome variables={variables.categories}/>
        </div>
        <div className="mt-[30px] w-full">
          <AdsThird layout="modern" variables={variables.types} />
        </div>
        <div>
          <CategoriesLastHome variables={variables.categories}/>
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
