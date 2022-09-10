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
export { getStaticPaths, getStaticProps } from '@/framework/blog.ssr';
import Footer from '@/components/layouts/footer';
import cn from 'classnames';


export const BlogDetailsPage = ({ blog }: any) => {
  const { t } = useTranslation('common');

  const { settings } = useSettings();
  useEffect(() => {
    if (window.Tawk_API) {
     window.Tawk_API.hideWidget();
   }
  }, []);

  return (
    <>
      <Seo title={blog?.topic} url={blog?.subject} />
      <div className="main-container w-full bg-gray-100">
        <div className="order-1 mb-8 w-full p-20 lg:h-[350px] overflow-hidden bg-neutral-800 bg-blend-overlay" style={{backgroundImage: `url(${blog.img})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
          <h1 className="mb-7 font-body text-2xl font-bold text-heading md:text-4xl text-light">
            {blog?.subject}
          </h1>
          <span className="text-sm text-body text-light">
              {blog?.date}
          </span>
        </div>
        <div>
        <div className="py-10 px-20">
          <h2 className="font-bold text-dark text-2xl">{blog?.topic}</h2>
          <div className="text-gray-700 text-sm mt-10 whitespace-pre-wrap">{blog?.content}</div>
        </div>
        </div>
      </div>
    </>
  );
};
BlogDetailsPage.getLayout = getLayout;
export default BlogDetailsPage;
