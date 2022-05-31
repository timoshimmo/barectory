import { FilterIcon } from '@/components/icons/filter-icon';
import MobileNavigation from '@/components/layouts/mobile-navigation';
import GeneralLayout from '@/components/layouts/_general';
import { Grid } from '@/components/products/grid';
import SearchCount from '@/components/search-view/search-count';
import SidebarFilter from '@/components/search-view/sidebar-filter';
import Sorting from '@/components/search-view/sorting';
import ErrorMessage from '@/components/ui/error-message';
import { PRODUCTS_PER_PAGE } from '@/framework/client/variables';
import { useProducts } from '@/framework/product';
import { drawerAtom } from '@/store/drawer-atom';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import StickyBox from 'react-sticky-box';
export { getServerSideProps } from '@/framework/search.ssr';
import Link from '@/components/ui/link';
import { ROUTES } from '@/lib/routes';
import { useCategory } from '@/framework/category';

export default function SearchPage() {
  const { query } = useRouter();
  const { searchType, ...restQuery } = query;
  const {
    products,
    isLoading,
    paginatorInfo,
    error,
    loadMore,
    isLoadingMore,
    hasMore,
  } = useProducts({
    limit: PRODUCTS_PER_PAGE,
    orderBy: 'created_at',
    sortedBy: 'DESC',
    ...(searchType && { type: searchType }),
    ...restQuery,
  });

  console.log("CATEGORIES: " + JSON.stringify(searchType) + " " + JSON.stringify(restQuery.category));
  const arr = restQuery.category.split(",");

  console.log("CATEGORIES ARR: " + JSON.stringify(arr));

  //const { category, isLoading, error } = useCategory({ slug: slug });


  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div className="w-full">
      <div className="mb-7 flex flex-col items-center justify-between md:flex-row">
        <div>
          <div className="flex mb-2">
            <Link
              className="text-sm text-heading"
              href={`${ROUTES.HOME}`}
            >
              Home
            </Link>

            {arr.map((item, i) => (
                <>
                  <span className="text-sm text-heading ml-2 mr-2 font-semibold"> > </span>
                  <Link
                    className="text-sm text-heading capitalize font-semibold"
                    href={`${ROUTES.HOME}/search?category=${item}`}
                  >
                    { item }
                  </Link>
                </>
              ))
            }
          </div>
          <SearchCount
            from={paginatorInfo?.firstItem ?? 0}
            to={paginatorInfo?.lastItem ?? 0}
            total={paginatorInfo?.total ?? 0}
          />
        </div>
        {/* //FIXME: */}

        <div className="mt-4 max-w-xs md:mt-0">
          <Sorting variant="dropdown" />
        </div>
      </div>
      <Grid
        products={products}
        loadMore={loadMore}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        error={error}
        column="five"
      />
    </div>
  );
}

const GetLayout = (page: React.ReactElement) => {
  const { t } = useTranslation('common');
  const [_, setDrawerView] = useAtom(drawerAtom);
  return (
    <GeneralLayout>
      <>
        <div className="w-full main-container bg-light">
          <div className="mx-auto flex min-h-screen w-full max-w-1920 px-5 py-10 rtl:space-x-reverse lg:space-x-10 xl:py-14 xl:px-16">
            <div className="hidden shrink-0 lg:block" style={{ width: '20%' }}>
              <StickyBox offsetTop={140} offsetBottom={30}>
                <SidebarFilter />
              </StickyBox>
            </div>
            {page}
          </div>
        </div>
        {/*
          <MobileNavigation>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() =>
                setDrawerView({
                  display: true,
                  view: 'SEARCH_FILTER',
                })
              }
              className="flex h-full items-center justify-center p-2 focus:text-accent focus:outline-none"
            >
              <span className="sr-only">{t('text-filter')}</span>
              <FilterIcon width="17.05" height="18" />
            </motion.button>
          </MobileNavigation>
          */}
      </>
    </GeneralLayout>
  );
};

SearchPage.getLayout = GetLayout;
