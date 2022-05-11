import { useTranslation } from 'next-i18next';
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


export const AboutPage = () => {
  const { t } = useTranslation('common');
  const { settings } = useSettings();
  return (
    <>
      <Seo title={'About'} url={'about'} />
      <div className="main-container w-full bg-gray-100 pt-6">
        <div className="order-1 mb-8 w-100 bg-light p-8 lg:mx-20 mx-5">
          <h1 className="mb-7 font-body text-xl font-bold text-heading md:text-2xl">
            About Us
          </h1>
          <span className="text-sm text-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </span>
          <h5 className="font-semibold text-heading mt-4">Our Misson</h5>
          <span className="text-sm text-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>
          <h5 className="font-semibold text-heading mt-4">Our Vison</h5>
          <span className="text-sm text-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>
        </div>
        <div className="order-2 mb-8 mt-10 w-100 bg-accent p-8 lg:mx-20 mx-5">
          <h1 className="mb-7 font-body text-xl font-bold text-heading md:text-2xl text-light">
            Our History
          </h1>
          <span className="text-sm text-body text-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </span>
        </div>
        <div className="order-3 mb-8 w-100 mt-10 bg-light p-8 lg:mx-20 mx-5">
          <h1 className="mb-7 font-body text-xl font-bold text-heading md:text-2xl">
            Our Values
          </h1>
          <span className="text-sm text-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </span>
        </div>
      </div>
    </>
  );
};
AboutPage.getLayout = getLayout;
export default AboutPage;
