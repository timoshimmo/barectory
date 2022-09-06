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

/*

<div className="order-3 mb-8 w-100 mt-10 bg-light p-8 lg:mx-20 mx-5">
  <h1 className="mb-7 font-body text-xl font-bold text-heading md:text-2xl">
    Our Values
  </h1>
  <span className="text-sm text-body">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </span>
</div>
*/


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
              Barectory Ventures Nigeria is a full service drinks retail firm. In addition to retailing drinks to customers and end-users, we also provide activation services to brands. We also train and supply bartenders and waiters for your events.
          </span>
          <br /><br />
          <span className="text-sm text-body">
              We also offer consultancy services if you are preparing for an event. We can also plan your drinks menu. This will help you control costs and know what is achievable given your budget. This takes into consideration the number of guests, food and drink pairings etc.
          </span>
          <br /><br />
          <span className="text-sm text-body">
              We also have considerable experience hosting activations with our partner brands. This puts us in a unique position where we can also give valuable insight on products and user acceptance as well as other actionable data.
          </span>
          <br /><br />
          <span className="text-sm text-body">
              We also have partnerships with most established brands and as such can leverage these relationships to ensure that our customers get the very best of products and service every time.
          </span>
        </div>
        <div className="order-2 mb-8 mt-10 w-100 bg-accent p-8 lg:mx-20 mx-5">
          <h1 className="mb-7 font-body text-xl font-bold text-heading md:text-2xl text-light">
            Our History
          </h1>
          <span className="text-sm text-body text-light">
              The business was founded in 2017 with a vision to ensure prompt, affordable and optimal drinks management while removing the stress of handling all the logistics involved for the customer. To this end, we as a business take our role very seriously. Our client satisfaction is our number one priority. Given the very interesting nature of our business, our key differentiator is that we treat each customer as unique. We understand that needs vary from one customer to another and we are poised to meet those needs while working with your budget.
          </span>
        </div>
      </div>
    </>
  );
};
AboutPage.getLayout = getLayout;
export default AboutPage;
