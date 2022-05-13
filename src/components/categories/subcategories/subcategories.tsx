import { useState, useEffect } from 'react';
import Head from 'next/head';
import { scroller, Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import Link from '@/components/ui/link';
import dynamic from 'next/dynamic';
import { ROUTES } from '@/lib/routes';
import type { Category } from '@/framework/types';
import { useAttributes } from './attributes.context';
import { useRouter } from 'next/router';
import ChildrenRow from '@/components/categories/subcategories/children-row';


type Props = {
  category: Category;
  loading: boolean;
};

const Subcategories: React.FC<Props> = ({
  category,
  loading
}) => {

  const {
    name,
    description,
    slug,
    children
  } = category ?? {};

  const { t } = useTranslation('common');
  const router = useRouter();
  const { attributes } = useAttributes();

    return (
      <div className="main-container w-full flex flex-col min-h-screen transition-colors duration-150 bg-white">
      <Head>
         <title>Barectory</title>
       </Head>
       <div className="flex flex-col w-full md:flex-row">
         <div className="p-6 pt-10 w-full lg:p-14 xl:p-16">
          <div className="w-100">
            <div className="flex mb-2">
                <Link
                  className="text-sm text-heading"
                  href={`${ROUTES.HOME}`}
                >
                  Home
                </Link>
                <span className="text-sm ml-2 mr-2 font-semibold"> > </span>
                <span className="text-sm font-semibold">{name}</span>
              </div>
              <h4 className="text-heading lg:text-3xl font-bold mt-10 lg:mt-[40px]">{name}</h4>
              <div className="w-full mt-20 lg:mt-[60px]">
                <ChildrenRow
                  notFound={!Boolean(children.length)}
                  categories={children}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Subcategories;
