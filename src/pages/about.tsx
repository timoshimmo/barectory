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
        <div
          className={cn('hidden lg:block relative', {
            '!block': layout === 'minimal',
          })}
        >
          <div
            className={cn('relative w-full h-screen', {
              'max-h-140': layout === 'standard',
              'max-h-[320px] md:max-h-[680px]': layout === 'minimal',
            })}
          >
            <Image
              className="w-full h-full min-h-140"
              src={banners![0]?.image?.original ?? productPlaceholder}
              alt={banners![0]?.title ?? ''}
              layout="fill"
              objectFit="cover"
            />
            <div
              className={cn(
                'p-5 md:px-20 absolute inset-0 w-full flex flex-col items-center justify-center text-center lg:space-y-10',
                {
                  'space-y-5 md:!space-y-8': layout === 'minimal',
                }
              )}
            >
              <h1
                className={cn(
                  'text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tight text-heading font-bold',
                  {
                    '!text-accent': layout === 'minimal',
                  }
                )}
              >
                {banners![0]?.title}
              </h1>
              <p className="text-sm md:text-base xl:text-lg text-body">
                {banners![0]?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
AboutPage.getLayout = getLayout;
export default AboutPage;
