import { useState, useEffect } from 'react';
import Head from 'next/head';
import { scroller, Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import Link from '@/components/ui/link';
import { ROUTES } from '@/lib/routes';
import type { Category } from '@/framework/types';
import { useAttributes } from './attributes.context';
import { useRouter } from 'next/router';

type Props = {
  category: Category;
};

const Subcategories: React.FC<Props> = ({
  category
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
          <h4 className="text-2xl font-bold">{name}</h4>
        </div>
      </div>
    );
};

export default Subcategories;
