import React, { useState, useEffect } from 'react';
import Link from '@/components/ui/link';
import { ROUTES } from '@/lib/routes';
import { useTranslation } from 'next-i18next';

interface Props {
  category: any[];
}

const BreadCrumb = ({ category }: Props) => {

  const { t } = useTranslation('common');
  const [parent, setParent] = useState('');

  useEffect(() => {
  // Perform localStorage action
  const parentCat = localStorage.getItem("parentCategory");
  setParent(parentCat);
}, [category])

  return (
      <div>
        <div className="flex mb-2">
          <Link
            className="text-sm text-heading"
            href={`${ROUTES.HOME}`}
          >
            Home
          </Link>
          <span className="text-sm text-heading ml-2 mr-2 font-semibold"> > </span>
          <Link
            className="text-sm text-heading capitalize text-heading"
            href={`${ROUTES.CATEGORIES}/${parent}`}
          >
            { parent.replaceAll("-", " ") }
          </Link>
          {category.map((item, i) => (
              <>
                <span className="text-sm text-heading ml-2 mr-2 font-semibold"> > </span>
                <Link
                  className="text-sm text-heading capitalize font-semibold"
                  href={`${ROUTES.HOME}/search?category=${item}`}
                >
                  { item.replace("-", " ") }
                </Link>
              </>
            ))
          }
        </div>
      </div>
  );

};

export default BreadCrumb;
