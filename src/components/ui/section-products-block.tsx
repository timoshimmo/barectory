import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from '@/components/ui/link';

type SectionProps = {
  className?: any;
  title?: string;
  href?: string;
};

/**
 * UI component for a section block
 * @param {string} title - The title of the section
 * @param {string} description - The description of the section
 * @param {string} href - The href of the external page for this section
 */

const SectionProductsBlock: React.FC<SectionProps> = ({
  className,
  title,
  href,
  children,
}) => {
  const { t } = useTranslation('common');
  return (
    <div
      className={cn(
        'w-full flex pb-[10px] xl:pb-[10px] 3xl:pb-[15px] px-3 md:px-5 lg:px-14 xl:px-16 flex-col',
        className
      )}
    >
      {title && (
        <div className="flex items-center justify-between mb-3">
          {title && (
            <h3 className="text-2xl lg:text-[27px] 3xl:text-3xl font-semibold">
              {t(title)}
            </h3>
          )}
          {href && (
            <Link
              href={href}
              className="text-base font-semibold justify-end transition-colors hover:text-orange-500"
            >
              {t('text-see-all')}
            </Link>
          )}
        </div>
      )}

      {children}
    </div>
  );
};

export default SectionProductsBlock;
