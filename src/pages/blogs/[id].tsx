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


export const BlogDetailsPage = ({ id }: any) => {
  const { t } = useTranslation('common');
  
  console.log("ID BLOG:" + id);

  const { settings } = useSettings();
  useEffect(() => {
    if (window.Tawk_API) {
     window.Tawk_API.hideWidget();
   }
  }, []);
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
        <div className=" p-10">

        </div>
        </div>
      </div>
    </>
  );
};
BlogDetailsPage.getLayout = getLayout;
export default BlogDetailsPage;
