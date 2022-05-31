import type { NextPageWithLayout } from '@/types';
import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';
import Button from '@/components/ui/button';
import CartCounterButton from '@/components/cart/cart-counter-button';
import NotFound from '@/components/ui/not-found';
import { useTranslation } from 'next-i18next';
import rangeMap from '@/lib/range-map';
import CouponLoader from '@/components/ui/loaders/coupon-loader';
import { useCoupons } from '@/framework/coupon';
import ErrorMessage from '@/components/ui/error-message';
import CouponCard from '@/components/ui/cards/coupon';
export { getStaticProps } from '@/framework/coupon.ssr';
import Footer from '@/components/layouts/footer';
import { Grid } from '@/components/products/grid';
import { useSalesProducts } from '@/framework/product';
import ProductLoader from '@/components/ui/loaders/product-loader';
import { ROUTES } from '@/lib/routes';
import Link from '@/components/ui/link';

const OffersPage: NextPageWithLayout = () => {
  const limit = 20;
  const { t } = useTranslation('common');
//  const { isLoading, isLoadingMore, hasMore, coupons, error, loadMore } =
//    useCoupons();

  const { products, isLoading, error } = useSalesProducts({ range: 30 });
  if (error) return <ErrorMessage message={error.message} />;
  if (!isLoading && !products.length) {
    return (
      <div className="min-h-full px-4 pt-6 pb-8 bg-gray-100 lg:p-8">
        <NotFound text="text-no-coupon" />
      </div>
    );
  }

  return (
    <>
      <Seo title="Offers" url="offers" />
      <div className="main-container w-full px-4 py-8 mx-auto bg-gray-100 max-w-1920 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <h1 className="mt-4 lg:text-4xl md:text-2xl font-semibold">Offers</h1>
        <div className="flex mb-5 mt-5">
          <Link
            className="text-sm text-heading"
            href={`${ROUTES.HOME}`}
          >
            Home
          </Link>
          <span className="text-sm text-heading ml-2 mr-2 font-semibold"> > </span>
          <span className="text-sm text-heading font-semibold">Offers</span>
        </div>
        <div className="w-full pt-5">
          {isLoading && !products.length
            ? rangeMap(limit, (i) => (
                <ProductLoader key={i} uniqueKey={`product-${i}`} />
              ))
            :
            <Grid
              products={products}
              loadMore={false}
              isLoading={isLoading}
              isLoadingMore={false}
              hasMore={false}
              error={error}
              column="five"
            />
          }
        </div>
      </div>
    </>
  );
};

OffersPage.getLayout = getLayout;

export default OffersPage;
