import type { NextPageWithLayout } from '@/types';
import HomeLayout from '@/components/layouts/_home';
import Seo from '@/components/seo/seo';
import { useWindowSize } from '@/lib/use-window-size';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { scroller } from 'react-scroll';
import { getStaticPaths, getStaticProps } from '@/framework/home-pages.ssr';
import { InferGetStaticPropsType } from 'next';
import * as ga from '../lib/ga'

export { getStaticPaths, getStaticProps };
const CartCounterButton = dynamic(
  () => import('@/components/cart/cart-counter-button'),
  { ssr: false }
);
const Classic = dynamic(() => import('@/components/layouts/classic'));
const Standard = dynamic(() => import('@/components/layouts/standard'));
const Modern = dynamic(() => import('@/components/layouts/modern'));
const Minimal = dynamic(() => import('@/components/layouts/minimal'));
const Compact = dynamic(() => import('@/components/layouts/compact'));

const MAP_LAYOUT_TO_GROUP: Record<string, any> = {
  classic: Classic,
  modern: Modern,
  standard: Standard,
  minimal: Minimal,
  compact: Compact,
  default: Classic,
};
const Home: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ variables, layout }) => {
  const { query } = useRouter();
  const router = useRouter();
  const { width } = useWindowSize();
  // const { layout, page } = useLayout();

  useEffect(() => {
    if (query.text || query.category) {
      scroller.scrollTo('grid', {
        smooth: true,
        offset: -110,
      });
    }
    const handleRouteChange = (url) => {
     ga.pageview(url)
   }
     //When the component is mounted, subscribe to router changes
     //and log those page views
     router.events.on('routeChangeComplete', handleRouteChange)

     // If the component is unmounted, unsubscribe
     // from the event with the `off` method
     return () => {
       router.events.off('routeChangeComplete', handleRouteChange)
     }
  }, [query.text, query.category, router.events]);

  const Component = MAP_LAYOUT_TO_GROUP[layout];
  return (
    <>
      {/* <Seo title={page?.name} url={page?.slug} images={page?.banners} /> */}
      <Component variables={variables} />
    {/*
      {!['compact', 'minimal'].includes(layout) && width > 1023 && (
          <CartCounterButton />
        )}
    */}
    </>
  );
};

Home.getLayout = function getLayout(page) {
  console.log("Current Layout:" + page.props.layout);
  //console.log("Current Page:" + JSON.stringify(page));
  return <HomeLayout layout={page.props.layout}>{page}</HomeLayout>;
};

export default Home;
