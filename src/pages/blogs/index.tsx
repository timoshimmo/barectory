import { useTranslation } from 'next-i18next';
import React, { useState, useEffect } from 'react';
import ContactForm from '@/components/settings/contact-form';
import { Image } from '@/components/ui/image';
import contactIllustration from '@/assets/contact-illustration.svg';
import { getLayout } from '@/components/layouts/layout';
import { formatAddress } from '@/lib/format-address';
import { getIcon } from '@/lib/get-icon';
import isEmpty from 'lodash/isEmpty';
import * as socialIcons from '@/components/icons/social';
import Seo from '@/components/seo/seo';
import { useSettings } from '@/framework/settings';
export { getStaticProps } from '@/framework/general.ssr';
import Footer from '@/components/layouts/footer';
import cn from 'classnames';
import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/router';
import { useBlogs } from '@/framework/blogs';


export const BlogPage = () => {
  const { t } = useTranslation('common');
  const { settings } = useSettings();
  const router = useRouter();
  const { blogs, isLoading, error } = useBlogs();

  useEffect(() => {
    if (window.Tawk_API) {
     window.Tawk_API.hideWidget();
   }
  }, [blogs]);
  const blogList = [
    {
      id: 1,
      img: "https://res.cloudinary.com/westpaybankit/image/upload/v1651246878/barectory/anthony-delanoix-vmrCxMRdq58-unsplash.jpg",
      subject: "Tips",
      topic: "Healthy Wine",
      date: "15 March 2022",
      content: "This is the data of the blog 1"
    },
    {
      id: 2,
      img: "https://res.cloudinary.com/westpaybankit/image/upload/v1651246878/barectory/dave-lastovskiy-RygIdTavhkQ-unsplash.jpg",
      subject: "Tips",
      topic: "Healthy Wine",
      date: "21 March 2022",
      content: "This is the data of the blog 2"
    },
    {
      id: 3,
      img: "https://res.cloudinary.com/westpaybankit/image/upload/v1651246878/barectory/eeshan-garg-KYuANAfgTWA-unsplash.jpg",
      subject: "Lifestyle",
      topic: "Brewed Beer",
      date: "21 March 2022",
      content: "This is the data of the blog 3"
    },
    {
      id: 4,
      img: "https://res.cloudinary.com/westpaybankit/image/upload/v1651501816/barectory/Sachet-Alcohol-696x387.jpg",
      subject: "News",
      topic: "NAFADAC bans Alcohol in Satchets and bottles below 200ml",
      date: "24 March 2022",
      content: "This is the data of the blog 4"
    },
    {
      id: 5,
      img: "https://res.cloudinary.com/westpaybankit/image/upload/v1651501816/barectory/29-lens-nightlife-embed-blog480.jpg",
      subject: "News",
      topic: "Rising night life & the alcohol industry",
      date: "26 March 2022",
      content: "This is the data of the blog 5"
    }
  ];

   const handleBlogClick = (id) => {
     router.push(`${ROUTES.BLOGS}/${id}`);
   }

  return (
    <>
      <Seo title={'Blogs'} url={'blogs'} />
      <div className="main-container w-full bg-gray-100">
        <div className="order-1 mb-8 w-full carbonFibre p-20 lg:h-[350px] overflow-hidden">
          <h1 className="mb-7 font-body text-2xl font-bold text-heading md:text-4xl text-light">
            Blogs
          </h1>
          <span className="text-sm text-body text-light">
              Get valuable information, tips and trends in the drinks market.
          </span>
        </div>
        <div>
        <div className=" p-10 grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 gap-y-10 lg:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] xl:gap-8 xl:gap-y-12 2xl:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
          {blogs.map((item, idx: number) => (
            <article
              className={cn(
                'product-card cart-type-helium rounded border border-border-200 h-full bg-light overflow-hidden transition-shadow duration-200 hover:shadow-md'
              )}
            >
              <div
                className="relative flex flex-col w-full"
              >
                <div className="relative w-full h-48" role="button" onClick={()=>handleBlogClick(item.id)}>
                  <Image
                    src={item.img}
                    alt={item.topic}
                    layout="fill"
                    height={120}
                    objectFit="cover"
                    className="product-image"
                  />
                </div>

                <div className="p-3 md:pt-4 md:p-5 relative h-full">
                  <h3
                    className="text-heading text-sm font-semibold truncate uppercase"
                  >
                    {item.subject}
                  </h3>
                  <p className="text-2xl truncate" role="button">{item.topic}</p>

                  <p className="text-muted text-xs mt-8">{item.date}</p>
                </div>
              </div>
            </article>
          ))}
          </div>
        </div>
      </div>
    </>
  );
};
BlogPage.getLayout = getLayout;
export default BlogPage;
